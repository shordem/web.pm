import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

import "./styles/globals.scss";

import QueryClientProvider from "./providers/query-client";
import Router from "./router";
import ErrorFallback from "./ui/ErrorFallback";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      {/* <TodoProvider> */}
      <QueryClientProvider>
        <div className="bg-[#1a1a1a] text-compliment">
          <div className="min-h-screen max-w-screen-2xl mx-auto">
            <Router />
          </div>
        </div>

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
      {/* </TodoProvider> */}
    </ErrorBoundary>
  );
}

export default App;
