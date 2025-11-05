import ProductCard from "./ProductCard";
import useCart from "../cart/useCart";
import useMutateCart from "../cart/useMutateCart";

function Products({ products }) {
  console.log(products);
  const { mutate, isPending } = useMutateCart();

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  const cartProducts = cart?.cart?.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

  if (!products)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          color: "red",
        }}
      >
        Failed to fetch products
      </div>
    );

  return (
    <div className="product-div">
      <div className="product-div__container">
        <ul className="product">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              mutate={mutate}
              cartProducts={cartProducts}
              isLoading={isPending}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Products;
