"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./Main/page";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
