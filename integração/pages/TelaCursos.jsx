import { useEffect, useState } from "react";
import { listarCursos, listarMaquinas, criarCurso } from "../services/api";

function TelaCursos() {
  const [cursos, setCursos] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState("Básico");
  const [conteudo, setConteudo] = useState("");
  const [selecionadas, setSelecionadas] = useState([]);

  async function carregar() {
    setCursos(await listarCursos());
    setMaquinas(await listarMaquinas());
  }

  useEffect(() => {
    carregar();
  }, []);

  function toggleMaquina(id) {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  async function adicionarCurso() {
    await criarCurso({
      nome,
      nivel,
      disponivel_publico: true,
      conteudo,
      maquinas_ids: selecionadas,
      modulos: ["Módulo 1", "Módulo 2"],
    });

    setNome("");
    setConteudo("");
    setSelecionadas([]);
    carregar();
  }

  return (
    <div>
      <h1>Cadastro de Cursos</h1>

      <input
        placeholder="Nome do Curso"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
        <option>Básico</option>
        <option>Intermediário</option>
        <option>Avançado</option>
      </select>

      <textarea
        placeholder="Conteúdo do curso"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />

      <h3>Selecionar Máquinas</h3>
      {maquinas.map((m) => (
        <div key={m.id}>
          <input
            type="checkbox"
            onChange={() => toggleMaquina(m.id)}
            checked={selecionadas.includes(m.id)}
          />
          {m.linha_equipamento} - {m.modelo_equipamento}
        </div>
      ))}

      <button onClick={adicionarCurso}>Criar Curso</button>

      <ul>
        {cursos.map((c) => (
          <li key={c.id}>{c.nome} - {c.nivel}</li>
        ))}
      </ul>
    </div>
  );
}

export default TelaCursos;