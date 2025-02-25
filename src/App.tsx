import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";


import Cart from "./components/Product/Cart";


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
