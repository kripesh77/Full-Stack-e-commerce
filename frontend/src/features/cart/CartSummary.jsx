import useCart from "./useCart";

function CartSummary() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);

  // Calculate totals
  const subtotal =
    cart?.products?.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0) || 0;

  const shipping = subtotal > 599 ? 0 : 200;
  const total = subtotal + shipping;

  if (!cart) return <div>&nbsp;</div>;

  return (
    <div className="cartPage__content--summary">
      <div className="order-summary">
        <div className="order-summary__header">
          <h2 className="order-summary__title">ORDER SUMMARY</h2>
        </div>

        <div className="order-summary__content">
          <div className="order-summary__line">
            <span className="order-summary__label">SUBTOTAL</span>
            <span className="order-summary__value">
              {subtotal.toFixed(2)} Rs
            </span>
          </div>

          <div className="order-summary__line">
            <span className="order-summary__label">SHIPPING</span>
            <span className="order-summary__value">
              {shipping > 0 ? `${shipping} Rs` : "FREE"}
            </span>
          </div>

          <div className="order-summary__line order-summary__line--total">
            <span className="order-summary__label">TOTAL</span>
            <span className="order-summary__value">{total.toFixed(2)} Rs</span>
          </div>
        </div>

        <button className="order-summary__checkout-btn">Check Out</button>
      </div>
    </div>
  );
}

export default CartSummary;
