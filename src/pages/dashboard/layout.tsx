import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/auth";
import { useRouter } from "@/router/router.hook";

const DashboardLayout = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.goTo("/login");
    }
  }, [auth.isAuthenticated]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
