import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import "./index.css";
import Perfil from "./pages/perfil";
import PerfilAdm from "./pages/perfilAdm";
import Login from "./pages/login";
import Sobre from "./pages/sobre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfilAdm" element={<PerfilAdm />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  );
}

export default App;
