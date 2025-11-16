import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UseCaseDependencyProvider } from "./infra/di/usecases/UseCaseDependencyProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UseCaseDependencyProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </UseCaseDependencyProvider>
  </StrictMode>
);
