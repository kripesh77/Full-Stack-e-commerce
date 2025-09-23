import { useSearchParams } from "react-router";
import ProductHero from "../features/products/ProductHero";
import ProductPagination from "../features/products/ProductPagination";
import Products from "../features/products/Products";
import { useProducts } from "../features/products/useProducts";
import Loader from "../ui/Loader";

function ProductsPage() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const {
    data: {
      products = [],
      pagination: { totalPages, currentPage, hasNext, hasPrev } = {},
    } = {},
    isPending,
  } = useProducts({ page });

  if (isPending) return <Loader />;

  return (
    <main>
      <ProductHero />
      <Products products={products} />
      <ProductPagination
        totalPages={totalPages}
        currentPage={currentPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </main>
  );
}

export default ProductsPage;
