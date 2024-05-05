import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
