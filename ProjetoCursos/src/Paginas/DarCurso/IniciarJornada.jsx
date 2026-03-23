import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/imagens/logo.png';
import Menu from '../../Menu.jsx';

function IniciarJornada(){
    const [cursos, setCursos] = useState([]);
    const [selected, setSelected] = useState (null);
    const [loading, setLoading] = useState(true);
    const [mostrarApenasDisponiveis, setMostrarApenasDisponiveis] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem('cursos') || '[]');
        setCursos(dados);
        setLoading(false);
    }, []);
    function refreshFromStorage(){
        const dados = JSON.parse(localStorage.getItem('cursos') || '[]');
        setCursos(dados);
    }
    function inciarCurso(curso){
         // abrir a tela de visualização (mesma rota de CriarCurso, em modo readOnly)
         navigate('/CriarCurso', { state: { cursoId: curso.id, readOnly: true } });
    }
    function excluirCurso(id){
        if(!window.confirm('Confirmar exclusão do curso?'))
            return;
        const novos = cursos.filter((c) => c.id !== id);
        localStorage.setItem('cursos', JSON.stringify(novos));
        setCursos(novos);
        if(selected && selected.id === id) setSelected(null);
    }
    function editar(id){
        navigate('/CriarCurso', {state: {cursoId: id }});
    }
    
    const cursosFiltrados = mostrarApenasDisponiveis ? cursos.filter((c) => c.disponivel) : cursos;

    if(loading)
        return <div>Carregando...</div>;

    return (
    <div>
        <div>
            <Menu></Menu>
        </div>
        <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Cursos</h1>
                <label>
                  <input
                  type="checkbox"
                  checked={mostrarApenasDisponiveis}
                  onChange={(e) => setMostrarApenasDisponiveis(e.target.checked)}
                  style={{ marginRight: 6 }}
                  />
                  Mostrar apenas disponíveis
                </label>
            </div>

            {cursosFiltrados.length === 0 ? (
            <p>Nenhum curso disponível</p>
            ) : (
            cursosFiltrados.map((curso) => (
            <div
                key={curso.id}
                style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    marginBottom: 15,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
                >
                <div>
                    <h2 style={{ margin: 0 }}>{curso.nomeCurso}</h2>
                    <p style={{ margin: '6px 0' }}>
                    <strong>Nível:</strong> {curso.nivelCurso} • <strong>Módulos:</strong>{' '}
                    {Array.isArray(curso.modulos) ? curso.modulos.length : 0}
                    </p>
                    <p style={{ margin: '6px 0' }}>
                    <strong>Criado em:</strong> {curso.dataCriacao} • <strong>Disponível:</strong>{' '}
                    {curso.disponivel ? 'Sim' : 'Não'}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => inciarCurso(curso)}
                    style={{
                        backgroundColor: '#0b7a4d',
                        color: '#fff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                    }}
                    >
                    Iniciar
                    </button>
                    <button
                      onClick={() => editar(curso.id)}
                      style={{
                          backgroundColor: '#0055A0',
                          color: '#f7db12',
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                      }}
                    >
                    Editar
                    </button>
                    <button
                      onClick={() => excluirCurso(curso.id)}
                      style={{
                          backgroundColor: '#c42b2b',
                          color: '#fff',
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: 6,
                          cursor: 'pointer',
                      }}
                    >
                    Excluir
                    </button>
                </div>
            </div>
          ))
        )}
        <button style={{padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', backgroundColor:'#0055A0', color:'white'}} onClick={() => navigate("/TelaInicio")}>Voltar</button>
      </div>
    </div>
  );
}
export default IniciarJornada;