import { Outlet } from "react-router";
import Header from "../ui/Header";
import TopNotification from "../ui/TopNotification";
import { useAuth } from "../hooks/useAuth";

function AppLayout() {
  const a = useAuth();
  console.log(a?.isAuthenticated);
  return (
    <>
      <TopNotification />
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
