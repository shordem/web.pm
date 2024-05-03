import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import ErrorFallback from "./ui/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
