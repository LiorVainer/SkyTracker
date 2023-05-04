"use client";

import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./main/page";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </Provider>
  );
}
