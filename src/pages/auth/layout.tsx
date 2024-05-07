import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useRouter } from "@/router/router.hook";
import { useAuth } from "./auth.hook";

function AuthLayout() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.goTo("/dashboard");
    }
  }, [auth.isAuthenticated]);
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
