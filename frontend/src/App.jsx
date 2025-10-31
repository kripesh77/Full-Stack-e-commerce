import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import AuthContextProvider from "./context/AuthContextProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Lazy load all page components
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Auth = lazy(() => import("./pages/Auth"));
const Signin = lazy(() => import("./features/user/Signin"));
const Signup = lazy(() => import("./features/user/Signup"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));

function AppRouter({ onComponentLoaded }) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  // Notify when first component is loaded
  useEffect(() => {
    onComponentLoaded();
  }, [onComponentLoaded]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route index element={<Navigate replace to="signin" />} />
          <Route
            path="signin"
            element={
              isAuthenticated ? <Navigate replace to="/products" /> : <Signin />
            }
          />
          <Route
            path="signup"
            element={
              isAuthenticated ? <Navigate replace to="/products" /> : <Signup />
            }
          />
        </Route>

        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <CartPage />
            ) : (
              <Navigate replace to="/auth/signin" />
            )
          }
        />

        {/* Payment result pages */}
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) {
      setIsReady(true);
      return;
    }

    const minDisplayTime = 1000;

    setTimeout(() => {
      preloader.style.background = "transparent";
      preloader.style.pointerEvents = "none";
      setIsReady(true);
    }, minDisplayTime);
  }, []);

  useEffect(() => {
    if (!isComponentLoaded) return;

    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gsap.to(".bars", {
          animationPlayState: "paused",
          transformOrigin: "bottom",
          scaleY: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            preloader.remove();
          },
        });
      });
    });
  }, [isComponentLoaded]);

  if (!isReady) return null;

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <AppRouter onComponentLoaded={() => setIsComponentLoaded(true)} />
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
