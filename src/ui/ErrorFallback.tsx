import { Button } from "@/components/ui/button";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="h-screen w-screen grid items-center justify-center">
      <div className="bg-white p-4 flex flex-col items-center rounded-lg">
        <h1>Something went wrong🥲</h1>
        <Button onClick={resetErrorBoundary}>Go Back Home</Button>
      </div>
    </div>
  );
}

export default ErrorFallback;
