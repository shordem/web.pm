import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/sign-up";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <SignupPage /> },
];
