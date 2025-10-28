import CartItems from "../features/cart/CartItems";
import CartSummary from "../features/cart/CartSummary";
import useCart from "../features/cart/useCart";
import HeaderLogo from "../ui/HeaderLogo";
function CartPage() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);
  return (
    <div className="cartPage">
      <HeaderLogo classname="cartPage__header--logo" />
      <div className="cartPage__text">SHOPPING CART</div>
      {!cart?.cart ? (
        <div className="empty-cart">Your Cart is empty, try adding some !</div>
      ) : (
        <div className="cartPage__content">
          <CartItems />
          <CartSummary />
        </div>
      )}
    </div>
  );
}

export default CartPage;
