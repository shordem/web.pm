import { Button } from "@/components/ui/button";
import PageCenter from "./PageCenter";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <PageCenter>
      <div className="bg-white p-4 flex flex-col items-center rounded-lg">
        <h1>Something went wrong🥲</h1>
        <Button onClick={resetErrorBoundary}>Go Back Home</Button>
      </div>
    </PageCenter>
  );
}

export default ErrorFallback;
