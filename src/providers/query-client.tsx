import {
  QueryClient,
  QueryClientProvider as QueryClientProviderImport,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Layout } from "@/interface";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function QueryClientProvider(props: Layout) {
  return (
    <QueryClientProviderImport client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {props.children}
    </QueryClientProviderImport>
  );
}

export default QueryClientProvider;
