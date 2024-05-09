import { Outlet } from "react-router-dom";

import { useAuthRedirect } from "@/hooks/auth";
import DashboardHeader from "./header";
import DashboardProvider from "@/providers/dashboard-provider";

const DashboardLayout = () => {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return <p>Kilode</p>;
  }
  return (
    <DashboardProvider>
      <main>
        <DashboardHeader />
        <Outlet />
      </main>
    </DashboardProvider>
  );
};

export default DashboardLayout;
