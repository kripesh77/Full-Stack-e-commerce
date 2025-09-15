import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../utils/apiCart";
import { LuShoppingCart } from "react-icons/lu";

function CartIndicator() {
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCarts(token),
  });

  if (!cart) return <span>&nbsp;</span>;

  const cartCount = cart.products.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);
  return (
    <div className="cart__indicator">
      <LuShoppingCart size={40} className="cart__indicator--icon" />
      <span className="cart__indicator--counter">{cartCount}</span>
    </div>
  );
}

export default CartIndicator;
