import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/auth";
import { useRouter } from "@/router/router.hook";
import DashboardHeader from "./header";

const DashboardLayout = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.goTo("/login");
    }
  }, [auth.isAuthenticated]);

  return (
    <main>
      <DashboardHeader />
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
