import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

import { GlobalProvider } from "./components/GlobalContext";


function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<Home />} />
          

        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
