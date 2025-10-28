import { LuShoppingCart } from "react-icons/lu";
import useCart from "./useCart";
import { useNavigate } from "react-router-dom";

function CartIndicator() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  if (!cart?.result) return <span>&nbsp;</span>;

  const cartCount = cart.cart.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  function handleClick() {
    navigate("/cart");
  }
  return (
    <div className="cart__indicator" onClick={handleClick}>
      <LuShoppingCart size={35} className="cart__indicator--icon" />
      <span className="cart__indicator--counter">{cartCount}</span>
    </div>
  );
}

export default CartIndicator;
