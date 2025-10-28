import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Auth from "./pages/Auth";
import Signin from "./features/user/Signin";
import Signup from "./features/user/Signup";
import OrderSuccess from "./pages/OrderSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function AppRouter() {
  const { isAuthenticated } = useAuthContext();

  return (
    <BrowserRouter>
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
