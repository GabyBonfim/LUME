import { useEffect, useState } from "react";
import {
  getColaboradores,
  getTestesPorColaborador,
  getFeedbacks,
} from "../services/adm";

import ChatLumIA from "../components/ChatLumIA";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PerfilAdm() {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<any>(null);
  const [testes, setTestes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Carrega lista de colaboradores ao abrir
  useEffect(() => {
    async function carregar() {
      const lista = await getColaboradores();
      setColaboradores(lista);
    }
    carregar();
  }, []);

  // Carrega testes e feedbacks quando seleciona colaborador
  useEffect(() => {
    if (!colaboradorSelecionado) return;

    async function carregarInfo() {
      const t = await getTestesPorColaborador(colaboradorSelecionado.id);
      const f = await getFeedbacks(colaboradorSelecionado.id);
      setTestes(t);
      setFeedbacks(f);
    }

    carregarInfo();
  }, [colaboradorSelecionado]);

  return (
    <div className="min-h-screen bg-[#FFFDD0] flex flex-col">
      <Navbar />

      <main className="flex flex-col md:flex-row gap-8 p-8">

        {/* Painel de colaboradores */}
        <div className="w-full md:w-1/3 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Colaboradores</h2>

          <ul className="space-y-2">
            {colaboradores.map((c: any) => (
              <li
                key={c.id}
                className={`p-2 rounded cursor-pointer ${
                  colaboradorSelecionado?.id === c.id
                    ? "bg-[#B3E099]"
                    : "bg-[#f0f5e9]"
                }`}
                onClick={() => setColaboradorSelecionado(c)}
              >
                {c.nome}
              </li>
            ))}
          </ul>
        </div>

        {/* Painel de informações do colaborador */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">

          {/* Testes atribuídos */}
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">
              Testes atribuídos
            </h2>

            {!colaboradorSelecionado && (
              <p className="text-gray-500">Selecione um colaborador...</p>
            )}

            {colaboradorSelecionado && (
              <ul className="space-y-2">
                {testes.length === 0 && (
                  <p className="text-gray-500">Nenhum teste atribuído</p>
                )}

                {testes.map((t: any) => (
                  <li
                    key={t.id}
                    className="p-3 rounded-xl bg-[#B3E099] shadow"
                  >
                    <p className="font-semibold">{t.titulo}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Feedbacks */}
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Feedbacks</h2>

            {!colaboradorSelecionado && (
              <p className="text-gray-500">Selecione um colaborador...</p>
            )}

            {colaboradorSelecionado && (
              <ul className="space-y-3">
                {feedbacks.length === 0 && (
                  <p className="text-gray-500">Nenhum feedback registrado</p>
                )}

                {feedbacks.map((f: any) => (
                  <li
                    key={f.id}
                    className="p-3 rounded-xl bg-[#f0f5e9] shadow"
                  >
                    <p className="font-semibold">
                      Teste #{f.idTeste}
                    </p>
                    <p className="text-gray-700">{f.feedback}</p>
                    <p className="text-xs text-gray-500 mt-1">{f.data}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Chat com LUM.IA */}
          <ChatLumIA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
