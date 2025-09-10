import { createBrowserRouter } from "react-router";
import AppLayout from "./pages/AppLayout";
import { RouterProvider } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
