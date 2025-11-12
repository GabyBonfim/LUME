import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import "./index.css";
import Perfil from "./pages/perfil";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;
