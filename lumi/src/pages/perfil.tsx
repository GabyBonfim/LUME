import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Perfil() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDD0] text-gray-800">
      <Navbar />

      <main className="flex flex-col items-center py-16 px-6">

        <div className="bg-[#FFFDEB] shadow-lg rounded-2xl w-full max-w-4xl">

          <div className="bg-[#B3E099] text-gray-900 text-lg font-semibold rounded-t-2xl px-6 py-3 -mt-8 mb-8 shadow">
            Dashboard
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-10 p-10">
            {/* Coluna esquerda */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3 text-center md:text-left">
              <div className="flex flex-col items-center mb-4">
                <img
                  src="/images/icon-user.png"
                  alt="Usuário"
                  className="w-20 h-20 rounded-full mb-2"
                />
                <p className="font-semibold">Ana Paula Sousa</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="bg-[#B3E099] text-sm px-4 py-1 rounded-full shadow">
                  30% cooperativa
                </span>
                <span className="bg-[#B3E099] text-sm px-4 py-1 rounded-full shadow">
                  50% proativa
                </span>
                <span className="bg-[#B3E099] text-sm px-4 py-1 rounded-full shadow">
                  90% inovadora
                </span>
              </div>
            </div>

            {/* Coluna direita */}
            <div className="w-full md:w-2/3">
              <h3 className="font-semibold mb-4 text-gray-800">Para fazer:</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow hover:shadow-md transition">
                  <img
                    src="/images/icon-calendar.png"
                    alt="Teste"
                    className="w-8 h-8"
                  />
                  <p className="font-medium text-gray-900">
                    Teste comportamental
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow hover:shadow-md transition">
                  <img
                    src="/images/icon-calendar.png"
                    alt="Teste"
                    className="w-8 h-8"
                  />
                  <p className="font-medium text-gray-900">
                    Teste comportamental
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow hover:shadow-md transition">
                  <img
                    src="/images/icon-calendar.png"
                    alt="Teste"
                    className="w-8 h-8"
                  />
                  <p className="font-medium text-gray-900">
                    Teste comportamental
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-10">
            <h2 className="text-lg font-semibold mb-4">Converse com LUM.IA</h2>

            <div className="bg-white rounded-xl shadow-md">
              <div className="bg-[#B3E099] text-gray-900 font-semibold rounded-t-xl px-4 py-2">
                Chat com LUM.IA
              </div>

              <div className="p-6 text-gray-500 text-center italic">
                Espaço reservado para o chat do IBM Watson
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
