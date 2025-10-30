import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import ProductHero from "../features/products/ProductHero";
import ProductPagination from "../features/products/ProductPagination";
import Products from "../features/products/Products";
import { useProducts } from "../features/products/useProducts";
import Loader from "../ui/Loader";
import transition from "../ui/transition";

function ProductPage() {
  const [searchParams] = useSearchParams();

  const page = useMemo(() => {
    const pageParam = searchParams.get("page");
    const parsedPage = parseInt(pageParam, 10);
    return parsedPage > 0 ? parsedPage : 1;
  }, [searchParams]);

  const {
    data: {
      data: { products = [], totalPages, currentPage, hasNext, hasPrev } = {},
    } = {},
    isPending,
    isFetching,
    isError,
    error,
  } = useProducts({ page });

  // Handle error state
  if (isError) {
    return (
      <main>
        <ProductHero />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <p style={{ color: "red", fontWeight: "bold" }}>
            {error?.message || "Failed to load products"}
          </p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </main>
    );
  }

  // Loading state
  if (isPending) {
    return (
      <main>
        <ProductHero />
        <Loader />
      </main>
    );
  }

  // No products found
  if (!products || products.length === 0) {
    return (
      <main>
        <ProductHero />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#666" }}>No products found</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <ProductHero />

      <div style={{ position: "relative", minHeight: "400px" }}>
        {/* Conditional render: show loading OR products */}
        {isFetching ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <Loader />
          </div>
        ) : (
          <Products products={products} />
        )}
      </div>

      <ProductPagination
        totalPages={totalPages}
        currentPage={currentPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </main>
  );
}

const ProductsPage = transition(ProductPage);
ProductsPage.displayName = "ProductsPage";
export default ProductsPage;
