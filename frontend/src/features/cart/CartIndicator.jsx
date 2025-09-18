import { LuShoppingCart } from "react-icons/lu";
import useCart from "./useCart";

function CartIndicator() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  if (!cart?.products) return <span>&nbsp;</span>;

  const cartCount = cart.products.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);
  return (
    <div className="cart__indicator">
      <LuShoppingCart size={35} className="cart__indicator--icon" />
      <span className="cart__indicator--counter">{cartCount}</span>
    </div>
  );
}

export default CartIndicator;
