import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Cakes } from "./pages/Cakes";
import { Brownies } from "./pages/Brownies";
import { Chocolates } from "./pages/Chocolates";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { Billing } from "./pages/Billing";
import { Contact } from "./pages/Contact";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "cakes", Component: Cakes },
      { path: "brownies", Component: Brownies },
      { path: "chocolates", Component: Chocolates },
      { path: "shop", Component: Shop },
      { path: "cart", Component: Cart },
      { path: "billing", Component: Billing },
      { path: "contact", Component: Contact },
      { path: "admin", Component: AdminDashboard },
    ],
  },
]);
