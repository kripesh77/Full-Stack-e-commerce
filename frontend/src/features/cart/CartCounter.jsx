import useCart from "./useCart";

function CartCounter() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  if (!cart?.cart) return <span>&nbsp;</span>;

  const cartCount = cart.cart.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  if (!cartCount) return null;

  return (
    <div className="navigation__cart--count">
      <span>{cartCount}</span>
    </div>
  );
}

export default CartCounter;
