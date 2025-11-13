import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import DashboardBox from "../components/dashboardbox";

export default function PerfilAdm() {
  const [modalType, setModalType] = useState<"test" | "edit" | null>(null);

  const users = [
    { id: 1, name: "Ana Paula Sousa" },
    { id: 2, name: "Carlos Mendes" },
    { id: 3, name: "Julia Ramos" },
    { id: 4, name: "Lucas Ferreira" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDD0] text-gray-800">
      <Navbar />

      <main className="flex flex-col items-center py-16 px-6">
        <DashboardBox title="Dashboard | ADM">
          <div className="flex flex-col gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col md:flex-row items-center justify-between bg-[#B3E099] rounded-xl shadow-md p-4 md:p-6"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/images/icon-user.png"
                    alt="Usuário"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>

                <div className="flex gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => setModalType("test")}
                    className="bg-[#FFFDEB] hover:bg-[#f6f1b3] text-sm px-4 py-1 rounded-full shadow transition"
                  >
                    Atrelar teste
                  </button>
                  <button
                    onClick={() => setModalType("edit")}
                    className="bg-[#FFFDEB] hover:bg-[#f6f1b3] text-sm px-4 py-1 rounded-full shadow transition"
                  >
                    Editar dados
                  </button>
                  <button className="bg-[#FFFDEB] hover:bg-[#f6f1b3] text-sm px-4 py-1 rounded-full shadow transition">
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardBox>
      </main>

      <Footer />

      {/* 🌿 Modal (Popup) */}
      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity">
          <div className="bg-[#FFFDEB] rounded-2xl shadow-xl w-11/12 max-w-lg p-8 relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg font-bold"
            >
              ×
            </button>

            {modalType === "test" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-center">
                  Testes disponíveis
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow">
                    <img
                      src="/images/icon-calendar.png"
                      alt="Teste"
                      className="w-8 h-8"
                    />
                    <p className="font-medium text-gray-900">
                      Teste comportamental
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow">
                    <img
                      src="/images/icon-calendar.png"
                      alt="Teste"
                      className="w-8 h-8"
                    />
                    <p className="font-medium text-gray-900">
                      Teste de raciocínio lógico
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#B3E099] py-3 px-4 rounded-xl shadow">
                    <img
                      src="/images/icon-calendar.png"
                      alt="Teste"
                      className="w-8 h-8"
                    />
                    <p className="font-medium text-gray-900">
                      Teste de perfil profissional
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === "edit" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-center">
                  Editar dados do colaborador
                </h2>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Nome completo"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B3E099]"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B3E099]"
                  />
                  <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B3E099]">
                    <option value="">Selecione o status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>

                  <button
                    type="submit"
                    className="bg-[#B3E099] hover:bg-[#9bcf80] text-gray-900 font-medium px-6 py-2 rounded-md mt-4 transition"
                  >
                    Salvar alterações
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
