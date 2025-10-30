import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
import Header from "../ui/Header";
import TopNotification from "../ui/TopNotification";
import { useAuthContext } from "../hooks/useAuthContext";
import CartIndicator from "../features/cart/CartIndicator";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

function AppLayout() {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <div className="App">
        <TopNotification />
        <Header />
        <Outlet />
      </div>
      {isAuthenticated && <CartIndicator />}
    </>
  );
}

export default AppLayout;
