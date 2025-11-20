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
