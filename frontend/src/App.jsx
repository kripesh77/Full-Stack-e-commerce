import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "./pages/AppLayout";
import { RouterProvider } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Auth from "./pages/Auth";
import Signin from "./features/user/Signin";
import Signup from "./features/user/Signup";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
