const API_URL = "http://127.0.0.1:8000";

export async function listarMaquinas() {
  const res = await fetch(`${API_URL}/maquinas`);
  return res.json();
}

export async function criarMaquina(dados) {
  const res = await fetch(`${API_URL}/maquinas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}

export async function deletarMaquina(id) {
  await fetch(`${API_URL}/maquinas/${id}`, {
    method: "DELETE",
  });
}

export async function listarCursos() {
  const res = await fetch(`${API_URL}/cursos`);
  return res.json();
}

export async function criarCurso(dados) {
  const res = await fetch(`${API_URL}/cursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return res.json();
}