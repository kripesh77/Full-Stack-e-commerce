import CartItem from "./CartItem";
import useCart from "./useCart";

function CartItems() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  console.log(cart);

  if (!cart?.products) return <div>Cart is empty, try adding some !</div>;

  return (
    <ul className="cartPage__content--ul" data-lenis-prevent>
      {cart.products.map((item) => (
        <CartItem
          key={item._id}
          details={item.productId}
          quantity={item.quantity}
        />
      ))}
    </ul>
  );
}

export default CartItems;
