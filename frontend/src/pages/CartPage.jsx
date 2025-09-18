import CartItems from "../features/cart/CartItems";
import CartSummary from "../features/cart/CartSummary";
import HeaderLogo from "../ui/HeaderLogo";
function CartPage() {
  return (
    <div className="cartPage">
      <HeaderLogo classname="cartPage__header--logo" />
      <div className="cartPage__text">SHOPPING CART</div>
      <div className="cartPage__content">
        <CartItems />
        <CartSummary />
      </div>
    </div>
  );
}

export default CartPage;
