import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
