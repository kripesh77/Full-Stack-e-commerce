import { useState } from "react";
import useCart from "./useCart";
import { createOrder } from "../../utils/apiOrder";
import toast from "react-hot-toast";

function CartSummary() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { data: cart } = useCart(auth?.token);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal =
    cart?.cart?.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0) || 0;

  const shipping = subtotal > 599 ? 0 : 200;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!auth?.token) {
      toast.error("Please login to checkout");
      return;
    }

    if (!cart?.cart || cart.cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order and get eSewa payment data
      const response = await createOrder(auth.token);

      if (response.success) {
        const { paymentData, esewaPaymentUrl } = response.data;

        // Create a form and submit to eSewa
        const form = document.createElement("form");
        form.method = "POST";
        form.action = esewaPaymentUrl;

        // Add all payment parameters as hidden inputs
        Object.keys(paymentData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = paymentData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to process checkout");
      setIsProcessing(false);
    }
  };

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

        <button
          className="order-summary__checkout-btn"
          onClick={handleCheckout}
          disabled={isProcessing || !cart?.cart || cart.cart.length === 0}
        >
          {isProcessing ? "Processing..." : "Pay with eSewa"}
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
