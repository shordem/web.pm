import {
  QueryClient,
  QueryClientProvider as QueryClientProvider1,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function QueryClientProvider({ children }) {
  return (
    <QueryClientProvider1 client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider1>
  );
}

export default QueryClientProvider;
