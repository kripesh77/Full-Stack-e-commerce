import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import transition from "../ui/transition";

function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reason] = useState(searchParams.get("reason"));

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const getReasonMessage = () => {
    switch (reason) {
      case "order_not_found":
        return "Order not found. Please try again.";
      case "invalid_signature":
        return "Payment verification failed. Please contact support.";
      case "amount_mismatch":
        return "Payment amount mismatch. Please try again.";
      default:
        return "Your payment could not be processed. Please try again or contact support.";
    }
  };

  return (
    <div className="payment-result">
      <div className="payment-result__container">
        <div className="payment-result__icon payment-result__icon--failure">
          <FaTimesCircle size={80} />
        </div>
        <h1 className="payment-result__title">Payment Failed</h1>
        <p className="payment-result__message">{getReasonMessage()}</p>
        <div className="payment-result__actions">
          <button
            onClick={() => navigate("/cart")}
            className="payment-result__btn payment-result__btn--primary"
          >
            Return to Cart
          </button>
          <button
            onClick={() => navigate("/products")}
            className="payment-result__btn payment-result__btn--secondary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
