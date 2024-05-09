import DashboardPage from "@/pages/dashboard";
import DashboardSettingsPage from "@/pages/dashboard/settings";

export const dashboardRoutes = [
  { path: "", element: <DashboardPage /> },
  { path: "settings", element: <DashboardSettingsPage /> },
];
