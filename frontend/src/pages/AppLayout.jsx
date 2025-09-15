import { Outlet } from "react-router";
import Header from "../ui/Header";
import TopNotification from "../ui/TopNotification";
import { useAuthContext } from "../hooks/useAuthContext";
import CartIndicator from "../ui/CartIndicator";

function AppLayout() {
  const { isAuthenticated } = useAuthContext();
  console.log(isAuthenticated);
  return (
    <>
      <TopNotification />
      <Header />
      <Outlet />
      {isAuthenticated && <CartIndicator />}
    </>
  );
}

export default AppLayout;
