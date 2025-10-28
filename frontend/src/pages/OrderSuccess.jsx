import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderId] = useState(searchParams.get("orderId"));

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="payment-result">
      <div className="payment-result__container">
        <div className="payment-result__icon payment-result__icon--success">
          <FaCheckCircle size={80} />
        </div>
        <h1 className="payment-result__title">Payment Successful!</h1>
        <p className="payment-result__message">
          Your order has been placed successfully. Thank you for shopping with
          us!
        </p>
        {orderId && (
          <p className="payment-result__order-id">Order ID: {orderId}</p>
        )}
        <div className="payment-result__actions">
          <button
            onClick={() => navigate("/products")}
            className="payment-result__btn payment-result__btn--primary"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/order/history")}
            className="payment-result__btn payment-result__btn--secondary"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
