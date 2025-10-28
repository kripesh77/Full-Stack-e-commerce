import { Outlet, useLocation } from "react-router-dom";
// import { useEffect } from "react";
import Header from "../ui/Header";
import TopNotification from "../ui/TopNotification";
import { useAuthContext } from "../hooks/useAuthContext";
import CartIndicator from "../features/cart/CartIndicator";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

function AppLayout() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuthContext();

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.5,
        normalizeScroll: true,
      });

      smoother.scrollTop(0);

      ScrollTrigger.refresh();

      return () => {
        smoother.kill();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="App">
            <TopNotification />
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
      {isAuthenticated && <CartIndicator />}
    </>
  );
}

export default AppLayout;
