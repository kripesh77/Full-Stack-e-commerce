import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "./pages/AppLayout";
import { RouterProvider } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Auth from "./pages/Auth";
import Signin from "./features/user/Signin";
import Signup from "./features/user/Signup";
import AuthContextProvider from "./context/AuthContextProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import ReactLenis from "lenis/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function AppRouter() {
  const { isAuthenticated } = useAuthContext();

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          index: true,
          element: <Navigate replace={true} to="signin" />,
        },
        {
          path: "signin",
          element: isAuthenticated ? (
            <Navigate replace={true} to="/products" />
          ) : (
            <Signin />
          ),
        },
        {
          path: "signup",
          element: isAuthenticated ? (
            <Navigate replace={true} to="/products" />
          ) : (
            <Signup />
          ),
        },
      ],
    },
    {
      path: "/cart",
      element: isAuthenticated ? (
        <CartPage />
      ) : (
        <Navigate replace={true} to="/auth/signin" />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthContextProvider>
      <ReactLenis
        root
        options={{
          duration: 1.6,
          prevent: (node) => {
            // this prevents Lenis from affecting elements with data-lenis-prevent attribute
            return (
              node.hasAttribute("data-lenis-prevent") ||
              node.closest("[data-lenis-prevent]") !== null
            );
          },
        }}
      >
        <AppRouter />
      </ReactLenis>
    </AuthContextProvider>
  );
}

export default App;
