import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../utils/apiCart";

function CartCounter() {
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
    <div className="navigation__cart--count">
      <span>{cartCount || "0"}</span>
    </div>
  );
}

export default CartCounter;
