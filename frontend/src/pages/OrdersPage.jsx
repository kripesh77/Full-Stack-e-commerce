import { Link } from "react-router-dom";
import OrderList from "../features/orders/OrderList";
import transition from "../ui/transition";

function OrdersPage() {
  return (
    <div className="orders-page">
      <header className="orders-page__header">
        <Link to="/" className="orders-page__logo">
          AliSasto
        </Link>
        <div className="orders-page__title-section">
          <h1 className="orders-page__title">Order History</h1>
          <p className="orders-page__subtitle">Track and manage your purchases</p>
        </div>
      </header>
      <OrderList />
    </div>
  );
}

const OrdersPageWithTransition = transition(OrdersPage);
OrdersPageWithTransition.displayName = "OrdersPage";
export default OrdersPageWithTransition;
