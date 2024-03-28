import App from "@/App.tsx";
import "@/index.css";
import City from "@/pages/City";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <City />,
    path: "/city/:id?",
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
