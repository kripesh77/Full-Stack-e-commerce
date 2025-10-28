import CartItem from "./CartItem";
import useCart from "./useCart";
import useMutateCart from "./useMutateCart";

function CartItems() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  const { mutate, isPending } = useMutateCart();

  return (
    <div className="cartPage__content--div" data-lenis-prevent>
      <ul className="cartPage__content--ul">
        {cart.cart.map((item) => (
          <CartItem
            em
            key={item._id}
            details={item.productId}
            quantity={item.quantity}
            mutate={mutate}
            isPending={isPending}
          />
        ))}
      </ul>
    </div>
  );
}

export default CartItems;
