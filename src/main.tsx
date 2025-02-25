import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalProvider } from "./components/Contexts/GlobalContext.tsx";
import { CartProvider } from "./components/Contexts/CartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // ✅ Initialize QueryClient

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </GlobalProvider>
  </QueryClientProvider>
);
