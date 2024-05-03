import LoginButton from "./LoginButton";
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
        <LoginButton onClick={resetErrorBoundary}>Go Back Home</LoginButton>
      </div>
    </PageCenter>
  );
}

export default ErrorFallback;
