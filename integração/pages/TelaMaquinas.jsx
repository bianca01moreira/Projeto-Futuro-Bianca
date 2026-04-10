import { useEffect, useState } from "react";
import { listarMaquinas, criarMaquina, deletarMaquina } from "../services/api";

function TelaMaquinas() {
  const [maquinas, setMaquinas] = useState([]);
  const [linha, setLinha] = useState("");
  const [modelo, setModelo] = useState("");

  async function carregar() {
    const data = await listarMaquinas();
    setMaquinas(data);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function adicionar() {
    if (!linha || !modelo) return;
    await criarMaquina({
      linha_equipamento: linha,
      modelo_equipamento: modelo,
    });
    setLinha("");
    setModelo("");
    carregar();
  }

  async function remover(id) {
    await deletarMaquina(id);
    carregar();
  }

  return (
    <div>
      <h1>Cadastro de Máquinas</h1>

      <input
        placeholder="Linha do Equipamento"
        value={linha}
        onChange={(e) => setLinha(e.target.value)}
      />
      <input
        placeholder="Modelo do Equipamento"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />
      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {maquinas.map((m) => (
          <li key={m.id}>
            {m.linha_equipamento} - {m.modelo_equipamento}
            <button onClick={() => remover(m.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TelaMaquinas;