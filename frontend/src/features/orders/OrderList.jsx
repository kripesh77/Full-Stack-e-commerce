import { memo } from "react";
import OrderItem from "./OrderItem";
import useOrders from "./useOrders";
import Loader from "../../ui/Loader";

const OrderList = memo(function OrderList() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const { orders, isLoading, error } = useOrders(auth?.token);


  if (isLoading) {
    return (
      <div className="orders__loading">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders__error">
        <p>Failed to load orders: {error.message}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="orders__empty">
        <p>You haven&apos;t placed any orders yet.</p>
        <p>Start shopping to see your order history here!</p>
      </div>
    );
  }

  return (
    <div className="orders__content">
      <ul className="orders__list">
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </ul>
    </div>
  );
});

export default OrderList;
