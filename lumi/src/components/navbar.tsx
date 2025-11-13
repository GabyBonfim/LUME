import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // pega o caminho atual
  const isHomePage = location.pathname === "/"; // verifica se está na homepage

  return (
    <nav className="bg-[#FFFDD0] py-8 shadow-sm">
      <div className="container mx-auto flex justify-center items-center space-x-10 text-gray-800 font-medium">
        <Link to="/" className="hover:text-gray-600 transition-colors">
          Homepage
        </Link>
        <Link to="/perfilAdm" className="hover:text-gray-600 transition-colors">
          Análise de perfil
        </Link>
        <Link to="/perfil" className="hover:text-gray-600 transition-colors">
          Perfil
        </Link>
        <Link to="/login" className="hover:text-gray-600 transition-colors">
          Login
        </Link>
      </div>

      {/* Exibe a logo apenas se NÃO estiver na homepage */}
      {!isHomePage && (
        <div className="flex justify-center mt-3">
          <img
            src="/images/logo-lume.png"
            alt="Logo Lume"
            className="w-40 h-auto mx-auto"
          />
        </div>
      )}
    </nav>
  );
}
