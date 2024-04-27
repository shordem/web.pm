import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './styles/globals.scss';

import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import TodoProvider from "./providers/todo.jsx";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

function App() {
  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => window.location.replace("/")}
  >
    <TodoProvider>
      <QueryClientProvider>

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  {" "}
                  <Home />{" "}
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-left"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              // backgroundColor: "var(--color-grey-0)",
              backgroundColor: "bg-red-500",
              color: "bg-red-100",
            },
          }}
        />
      </QueryClientProvider>
    </TodoProvider>
  </ErrorBoundary>
  );
}

export default App;
