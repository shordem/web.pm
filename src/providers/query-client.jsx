import { QueryClient, QueryClientProvider as QueryClientProvider_ } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  
  function QueryClientProvider({children}) {
    return (
      
      <QueryClientProvider_ client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider_>
    )
  }
  
  export default QueryClientProvider