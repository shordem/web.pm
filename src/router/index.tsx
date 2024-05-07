import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/pages/auth/layout";
import DashboardLayout from "@/pages/dashboard/layout";
import BaseLayout from "@/pages/layout";
import { authRoutes } from "./auth.route";
import { dashboardRoutes } from "./dashboard.route";
import { layoutRoutes } from "./layout.route";

export const routes = [
  { path: "/", element: <BaseLayout />, children: layoutRoutes },
  { path: "/", element: <AuthLayout />, children: authRoutes },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: dashboardRoutes,
  },
];

const router = createBrowserRouter(routes);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
