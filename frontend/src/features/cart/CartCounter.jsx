import useCart from "./useCart";

function CartCounter() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  if (!cart?.products) return <span>&nbsp;</span>;

  const cartCount = cart.products.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  return (
    <div className="navigation__cart--count">
      <span>{cartCount || "0"}</span>
    </div>
  );
}

export default CartCounter;
