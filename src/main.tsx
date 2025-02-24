
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalProvider } from "./components/Contexts/GlobalContext.tsx";
import { CartProvider } from "./components/Contexts/CartContext.tsx";


createRoot(document.getElementById("root")!).render(
  // <BrowserRouter>
    // {/* <StrictMode> */}
      <GlobalProvider>
      <CartProvider>
      <App />
      </CartProvider>
      </GlobalProvider>
    // {/* </StrictMode> */}
  // </BrowserRouter>
);
