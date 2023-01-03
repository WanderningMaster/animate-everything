import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scaffold.css";
import { App } from "./application/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        toastStyle={{
          backgroundColor: "rgb(100 116 139)",
          color: "white",
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "1.5rem",
          fontFamily: "Roboto Mono, monospace",
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
