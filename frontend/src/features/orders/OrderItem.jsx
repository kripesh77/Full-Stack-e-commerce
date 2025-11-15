import { memo } from "react";

const OrderItem = memo(function OrderItem({ order }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (status) => {
    const baseClass = "order-item__badge";
    switch (status) {
      case "completed":
        return `${baseClass} ${baseClass}--success`;
      case "pending":
        return `${baseClass} ${baseClass}--pending`;
      case "failed":
        return `${baseClass} ${baseClass}--failed`;
      case "shipped":
        return `${baseClass} ${baseClass}--shipped`;
      case "delivered":
        return `${baseClass} ${baseClass}--delivered`;
      default:
        return baseClass;
    }
  };

  return (
    <li className="order-item">
      <div className="order-item__header">
        <div className="order-item__info">
          <h3 className="order-item__title">Order <span>#{order.publicToken}</span></h3>
          <p className="order-item__date">{formatDate(order.createdAt)}</p>
        </div>
        <div className="order-item__badges">
          <div className="order-item__badge-group">
            <span className="order-item__badge-label">Payment:</span>
            <span className={getStatusBadgeClass(order.paymentStatus)}>
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
          </div>
          <div className="order-item__badge-group">
            <span className="order-item__badge-label">Delivery:</span>
            <span className={getStatusBadgeClass(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="order-item__products">
        <h4 className="order-item__products-title">Products:</h4>
        <ul className="order-item__products-list">
          {order.products.map((item, index) => (
            <li key={index} className="order-item__product">
              <div className="order-item__product-info">
                <img
                  src={item.productId?.imageUrl}
                  alt={item.productId?.name || "Product"}
                  className="order-item__product-image"
                />
                <div className="order-item__product-details">
                  <div className="order-item__product-name">
                    {item.productId?.name || "Product not available"}
                  </div>
                  <span className="order-item__product-quantity">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
              <span className="order-item__product-price">
                Rs.{((item.productId?.price || 0) * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-item__footer">
        {order.esewaTransactionCode && (
          <div className="order-item__transaction">
            <span className="order-item__transaction-label">Transaction id:</span>
            <span className="order-item__transaction-code">
              {order.esewaTransactionCode}
            </span>
          </div>
        )}
        <div className="order-item__total">
          <span className="order-item__total-label">Total Amount:</span>
          <span className="order-item__total-amount">
            Rs.{order.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
});

export default OrderItem;
