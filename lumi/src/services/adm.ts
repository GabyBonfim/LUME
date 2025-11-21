const API = "http://localhost:8080";

export async function getColaboradores() {
  const res = await fetch(`${API}/colaboradores`);
  if (!res.ok) throw new Error("Erro ao buscar colaboradores");
  return res.json();
}

export async function getTestesPorColaborador(id: number) {
  const res = await fetch(`${API}/testes/colaborador/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar testes do colaborador");
  return res.json();
}

export async function getFeedbacks(id: number) {
  const res = await fetch(`${API}/feedbacks/colaborador/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar feedbacks");
  return res.json();
}

// ===============================
// 🚀 NOVO — ATUALIZAR COLABORADOR
// ===============================
export async function updateColaborador(id: number, dados: any) {
  const res = await fetch(`${API}/colaboradores/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  // se backend só retorna texto → usa .text()
  if (!res.ok) throw new Error("Erro ao atualizar colaborador");
  
  try { return await res.json(); }
  catch { return await res.text(); }
}


// ===============================
// 🚀 NOVO — DELETAR COLABORADOR
// ===============================
export async function deleteColaborador(id: number) {
  const res = await fetch(`${API}/colaboradores/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar colaborador");
  return res.json();
}

// ===============================
// 🚀 NOVO — CRIAR COLABORADOR
// ===============================
export async function createColaborador(dados: any) {
  const res = await fetch(`${API}/colaboradores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error("Erro ao criar colaborador");
  return res.json();
}
