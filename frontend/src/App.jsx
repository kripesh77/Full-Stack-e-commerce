import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthContextProvider from "./context/AuthContextProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Spinner from "./ui/Spinner";
import { AnimatePresence } from "framer-motion";

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

function AppRouter() {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  return (
    <Suspense fallback={<Spinner />}>
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
                isAuthenticated ? <Navigate replace to="/me" /> : <Signin />
              }
            />
            <Route
              path="signup"
              element={
                isAuthenticated ? (
                  <Navigate replace to="/products" />
                ) : (
                  <Signup />
                )
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
    </Suspense>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
