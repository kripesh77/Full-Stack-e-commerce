import { Outlet } from "react-router";
import Header from "../ui/Header";
import TopNotification from "../ui/TopNotification";

function AppLayout() {
  return (
    <>
      <TopNotification />
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
