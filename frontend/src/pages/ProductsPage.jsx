import ProductHero from "../features/products/ProductHero";
import Products from "../features/products/Products";
import { useProducts } from "../features/products/useProducts";
import Loader from "../ui/Loader";

function ProductsPage() {
  const { data, isPending } = useProducts();

  if (isPending) return <Loader />;
  return (
    <main>
      <ProductHero />
      <Products products={data.products} />
    </main>
  );
}

export default ProductsPage;
