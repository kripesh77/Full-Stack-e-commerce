import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import Header from "../ui/Header";
import TopNotification from "../ui/TopNotification";
import { useAuthContext } from "../hooks/useAuthContext";
import CartIndicator from "../features/cart/CartIndicator";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

function AppLayout() {
  const { isAuthenticated } = useAuthContext();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: 0.5,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Syncing Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

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
