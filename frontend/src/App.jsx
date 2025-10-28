import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthContextProvider from "./context/AuthContextProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Spinner from "./ui/Spinner";

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

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
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
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
