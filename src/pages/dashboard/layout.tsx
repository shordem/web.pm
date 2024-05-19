import { Outlet } from "react-router-dom";

import { useAuthRedirect } from "@/hooks/auth";
import DashboardHeader from "./header";
import DashboardProvider from "@/providers/dashboard-provider";
import Loader from "@/components/ui/loading";

const DashboardLayout = () => {
  const isLoading = useAuthRedirect();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
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
