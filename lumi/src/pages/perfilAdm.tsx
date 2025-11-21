import { useEffect, useState } from "react";

import {
  getColaboradores,
  getTestesPorColaborador,
  getFeedbacks,
  updateColaborador,
  deleteColaborador,
} from "../services/adm";

import ChatLumIA from "../components/ChatLumIA";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PerfilAdm() {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<any>(null);
  const [testes, setTestes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Modal
  const [editando, setEditando] = useState(false);

  // Campos
  const [editNome, setEditNome] = useState("");
  const [editDataNasc, setEditDataNasc] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNumero, setEditNumero] = useState("");

  const [editEndereco, setEditEndereco] = useState({
    id: null,
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    estado: "",
    regiao: "",
  });

  // =============================
  // Carregar colaboradores
  // =============================
  useEffect(() => {
    carregarColaboradores();
  }, []);

  async function carregarColaboradores() {
    const lista = await getColaboradores();
    setColaboradores(lista);
  }

  // =============================
  // Selecionar colaborador
  // =============================
  useEffect(() => {
    if (!colaboradorSelecionado) return;

    setEditNome(colaboradorSelecionado.nome);
    setEditDataNasc(colaboradorSelecionado.dataNascimento);
    setEditCpf(colaboradorSelecionado.cpf);
    setEditEmail(colaboradorSelecionado.email);
    setEditNumero(colaboradorSelecionado.numero);

    setEditEndereco({
      id: colaboradorSelecionado.endereco.id,
      cep: colaboradorSelecionado.endereco.cep,
      logradouro: colaboradorSelecionado.endereco.logradouro,
      complemento: colaboradorSelecionado.endereco.complemento,
      bairro: colaboradorSelecionado.endereco.bairro,
      localidade: colaboradorSelecionado.endereco.localidade,
      estado: colaboradorSelecionado.endereco.estado,
      regiao: colaboradorSelecionado.endereco.regiao,
    });

    async function carregar() {
      const t = await getTestesPorColaborador(colaboradorSelecionado.id);
      const f = await getFeedbacks(colaboradorSelecionado.id);
      setTestes(t);
      setFeedbacks(f);
    }

    carregar();

  }, [colaboradorSelecionado]);

  // =============================
  // ViaCEP — Auto preencher endereço
  // =============================
  async function buscarCEP(cep: string) {
    if (cep.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (!data.erro) {
        setEditEndereco((prev) => ({
          ...prev,
          logradouro: data.logradouro || "",
          bairro: data.bairro || "",
          localidade: data.localidade || "",
          estado: data.uf || "",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    }
  }

  // =============================
  // Salvar edição COMPLETA
  // =============================
  async function salvarEdicao() {
    const atualizado = {
      id: colaboradorSelecionado.id,
      nome: editNome,
      dataNascimento: editDataNasc,
      cpf: editCpf,
      email: editEmail,
      numero: Number(editNumero),
      testesAtrelados: colaboradorSelecionado.testesAtrelados ?? "",
      endereco: {
        id: editEndereco.id,
        cep: editEndereco.cep,
        logradouro: editEndereco.logradouro,
        complemento: editEndereco.complemento,
        bairro: editEndereco.bairro,
        localidade: editEndereco.localidade,
        estado: editEndereco.estado,
        regiao: editEndereco.regiao,
      },
    };

    try {
      await updateColaborador(atualizado.id, atualizado);
      setEditando(false);
      await carregarColaboradores();
    } catch (error) {
      console.error("Erro ao atualizar", error);
      alert("Erro ao salvar alterações");
    }
  }

  // =============================
  // Excluir
  // =============================
  async function excluir(c: any) {
    if (!confirm(`Tem certeza que deseja excluir ${c.nome}?`)) return;

    await deleteColaborador(c.id);
    carregarColaboradores();

    if (colaboradorSelecionado?.id === c.id) {
      setColaboradorSelecionado(null);
      setTestes([]);
      setFeedbacks([]);
    }
  }

  // =============================
  // JSX
  // =============================
  return (
    <div className="min-h-screen bg-[#FFFDD0] flex flex-col">
      <Navbar />

      {/* ================= MODAL ================= */}
      {editando && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[450px] max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl font-semibold mb-4 text-center text-[#5a6e4f]">
              Editar Colaborador
            </h2>

            {/* Nome */}
            <label className="font-medium">Nome</label>
            <input className="border p-2 rounded w-full mb-3"
              value={editNome} onChange={(e) => setEditNome(e.target.value)} />

            {/* Data nascimento */}
            <label className="font-medium">Data de Nascimento</label>
            <input className="border p-2 rounded w-full mb-3"
              value={editDataNasc} onChange={(e) => setEditDataNasc(e.target.value)} />

            {/* CPF */}
            <label className="font-medium">CPF</label>
            <input className="border p-2 rounded w-full mb-3"
              value={editCpf} onChange={(e) => setEditCpf(e.target.value)} />

            {/* Email */}
            <label className="font-medium">Email</label>
            <input className="border p-2 rounded w-full mb-3"
              value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />

            {/* Número */}
            <label className="font-medium">Número residencial</label>
            <input className="border p-2 rounded w-full mb-3"
              value={editNumero} onChange={(e) => setEditNumero(e.target.value)} />

            {/* Endereço */}
            <h3 className="font-semibold mt-4 mb-2 text-[#5a6e4f]">Endereço</h3>

            {/* CEP com busca automática */}
            <label className="font-medium">CEP</label>
            <input
              className="border p-2 rounded w-full mb-3"
              value={editEndereco.cep}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setEditEndereco({ ...editEndereco, cep: v });
                if (v.length === 8) buscarCEP(v);
              }}
            />

            {/* Outros campos */}
            {["logradouro", "complemento", "bairro", "localidade", "estado", "regiao"].map((campo) => (
              <div key={campo} className="mb-3">
                <label className="font-medium capitalize">{campo}</label>
                <input
                  className="border p-2 rounded w-full"
                  value={(editEndereco as any)[campo]}
                  onChange={(e) =>
                    setEditEndereco({ ...editEndereco, [campo]: e.target.value })
                  }
                />
              </div>
            ))}

            {/* BOTÕES */}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-[#c9c9c9] rounded text-black hover:bg-[#b6b6b6]"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-[#789c63] text-white rounded hover:bg-[#6c8a58]"
                onClick={salvarEdicao}
              >
                Salvar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= LISTA / TESTES / FEEDBACKS ================= */}
      <main className="flex flex-col md:flex-row gap-8 p-8">

        {/* Lista */}
        <div className="w-full md:w-1/3 bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4 text-[#5a6e4f]">Colaboradores</h2>

          <ul className="space-y-3">
            {colaboradores.map((c: any) => (
              <li key={c.id}
                className={`p-3 rounded-xl flex items-center justify-between border shadow-sm cursor-pointer
                ${colaboradorSelecionado?.id === c.id ? "bg-[#B3E099]" : "bg-[#f0f5e9]"}`}
              >
                <span onClick={() => setColaboradorSelecionado(c)}
                  className="font-medium">
                  {c.nome}
                </span>

                <div className="flex gap-2">

                  {/* EDITAR */}
                  <button
                    className="px-3 py-1 text-sm rounded-md bg-[#789c63] text-white hover:bg-[#6c8a58]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setColaboradorSelecionado(c);
                      setEditando(true);
                    }}
                  >
                    Editar
                  </button>

                  {/* EXCLUIR */}
                  <button
                    className="px-3 py-1 text-sm rounded-md bg-[#b65c5c] text-white hover:bg-[#9e4f4f]"
                    onClick={(e) => {
                      e.stopPropagation();
                      excluir(c);
                    }}
                  >
                    Excluir
                  </button>

                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Testes e Feedbacks */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-[#5a6e4f]">Testes atribuídos</h2>
            {!colaboradorSelecionado ? (
              <p className="text-gray-500">Selecione um colaborador...</p>
            ) : testes.length === 0 ? (
              <p className="text-gray-500">Nenhum teste atribuído</p>
            ) : (
              <ul className="space-y-3">
                {testes.map((t: any) => (
                  <li key={t.id} className="p-3 rounded-xl bg-[#B3E099] shadow">
                    <p className="font-semibold">{t.titulo}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4 text-[#5a6e4f]">Feedbacks</h2>
            {!colaboradorSelecionado ? (
              <p className="text-gray-500">Selecione um colaborador...</p>
            ) : feedbacks.length === 0 ? (
              <p className="text-gray-500">Nenhum feedback disponível</p>
            ) : (
              <ul className="space-y-3">
                {feedbacks.map((f: any) => (
                  <li key={f.id} className="p-3 rounded-xl bg-[#f0f5e9] shadow">
                    <p className="font-semibold">Teste #{f.idTeste}</p>
                    <p>{f.feedback}</p>
                    <p className="text-xs text-gray-500 mt-1">{f.data}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ChatLumIA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
