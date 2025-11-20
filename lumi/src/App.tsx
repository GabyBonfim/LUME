import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import "./index.css";
import Perfil from "./pages/perfil";
import PerfilAdm from "./pages/perfilAdm";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfilAdm" element={<PerfilAdm />} />
    </Routes>
  );
}

export default App;
