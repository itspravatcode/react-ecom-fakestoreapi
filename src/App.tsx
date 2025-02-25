import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

import { GlobalProvider } from "./components/Contexts/GlobalContext";
import Cart from "./components/Product/Cart";
import { CartProvider } from "./components/Contexts/CartContext";

function App() {
  return (
  
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>

  );
}

export default App;
