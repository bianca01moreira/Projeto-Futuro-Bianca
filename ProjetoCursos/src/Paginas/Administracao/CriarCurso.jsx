import Menu from "../../Menu.jsx"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./CriarCurso.css";
import './Modal.css';

//para usar o react-quill-new
import EditorQuill from "../../componentes/EditorQuill";

function CriarCurso(){
    // hooks
    const [nomeCurso, setNomeCurso] = useState("")
    const [nivelCurso, setNivelCurso] = useState("")

    //hooks para o modulo/modal do curso
    const [modulos, setModulos] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [moduloCurso, setModuloCurso] = useState("")
    const [descricao, setDescricao] = useState("")
    const [moduloEmEdicao, setModuloEmEdicao] = useState(null)
    const[idModulo, setIdModulo] = useState(1)  //Quando o backend for criado isso será desnecessário

    //Hook PARA CADASTRO/MODAL DAS MAQUINAS
    const [maquinas, setMaquinas] = useState([])
    const [modalMaquinaIsOpen, setModalMaquinaIsOpen] = useState(false)
    const [modeloEquipamento, setModeloEquipamento] = useState("")
    const [linhaEquipamento, setLinhaEquipamento] = useState("")
    const[idMaquina, setIdMaquina] = useState(1) //Quando o backend for criado isso será desnecessário
    const[maquinaEmEdicao, setMaquinaEmEdicao] = useState(null)
    const[maquinaEmCadastro, setMaquinaEmCadastro] = useState (null)
    const [maquinasSelecionadas, setMaquinasSelecionadas] = useState([])
    const [abaMaquina, setAbaMaquina] = useState("listar") //"listar" ou "cadastrar"

    //HOOK PARA O REACT QUILL
    const [conteudoCurso, setConteudoCurso] = useState("");
    const [disponivel, setDisponivel] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const editandoId = location.state?.cursoId || null;
    const readOnly = location.state?.readOnly || false;

    useEffect(() =>{
        if (!editandoId)
            return;
        const cursosSalvos = JSON.parse(localStorage.getItem('cursos') || '[]');
        const curso = cursosSalvos.find(c => String(c.id) === String(editandoId));
        if (curso){
            setNomeCurso(curso.nomeCurso || '');
            setNivelCurso(curso.nivelCurso || '');
            setModulos(curso.modulos || []);
            setMaquinasSelecionadas(curso.maquinasSelecionadas || []);
            setConteudoCurso(curso.conteudoCurso || '');
            const maiorIdModulo = (curso.modulos || []).reduce((m, md) => Math.max(m, md.id || 0), 0);
            setIdModulo(maiorIdModulo + 1);
            setDisponivel(curso.disponivel ?? true);
        }
    }, [editandoId]);


    //função para salvar os módulos do curso
    function salvar() {
        if (!moduloCurso || !descricao) {
            alert("Preencha todos os campos")
            return
        }

        if(moduloEmEdicao){
            //Função para editar modulos existentes
            setModulos(modulos.map(mod =>
                mod.id === moduloEmEdicao.id
                ? {...mod, nome: moduloCurso, descricao: descricao}
                : mod
            ))
            setModuloEmEdicao(null)
        } else {
            const novoModulo = {
                id: idModulo,
                nome: moduloCurso,
                descricao: descricao,
            }
            setIdModulo(idModulo+1)
            setModulos([...modulos, novoModulo])
        }

        setModuloCurso("")
        setDescricao("")
        fecharModal()
    }
    //abre o modal dos modulos
    function abrirModal() {
        setModalIsOpen(true)
    }
    //fecha o modal dos modulos
    function fecharModal() {
        setModalIsOpen(false)
        setModuloEmEdicao(null)
        setModuloCurso("")
        setDescricao("")
    }
    //função para editar o Modulo
    function editarModulo(modulo){
        setModuloEmEdicao(modulo)
        setModuloCurso(modulo.nome)
        setDescricao(modulo.descricao)
        abrirModal()
    }
    //função para deletar o modulo
    function deletarModulo(id){
        setModulos(modulos.filter(modulo => modulo.id !== id))
    }

    //Função para selecionar/tirar seleção da máquina
    function toggleMaquinaSelecionada(id){
        setMaquinasSelecionadas(prev =>
            prev.includes(id)
                ? prev.filter(mId => mId !== id)
                :[...prev, id]
        )
    }

    //função para abrir o modal das maquinas em aba "listar"
    function abrirModalMaquina() {
        setAbaMaquina("listar")
        setModalMaquinaIsOpen(true)
    }
    //funcao para fechar o modal das maquinas
    function fecharModalMaquina() {
        setModalMaquinaIsOpen(false)
        setAbaMaquina("listar")
        setLinhaEquipamento("")
        setModeloEquipamento("")
        setMaquinaEmEdicao(null)
    }
    function salvarMaquina(){
        if(maquinaEmEdicao){
            //Função para editar maquinas existentes
            setMaquinas(maquinas.map(maquina =>
                maquina.id === maquinaEmEdicao.id
                ? {...maquina, linhaEquipamento: linhaEquipamento, modeloEquipamento: modeloEquipamento}
                : maquina
            ))
            setMaquinaEmEdicao(null)
        } else {
            const novaMaquina = {
                id: idMaquina,
                linhaEquipamento: linhaEquipamento,
                modeloEquipamento: modeloEquipamento,
            }
            setIdMaquina(idMaquina+1)
            setMaquinas([...maquinas, novaMaquina])
        }

        setModeloEquipamento("")
        setLinhaEquipamento("")
        setAbaMaquina("listar")
        fecharModalMaquina()
    }

    //Função salvar curso
    function salvarCurso(nomeCurso, nivelCurso, maquinasSelecionadas){
        if(nomeCurso=="" || nivelCurso == "" || maquinasSelecionadas.length === 0 || modulos.length===0){
            alert("Antes de salvar você precisa adicionar nível, nome, máquinas e os módulos desse curso.")
            return;
        }
        const cursoObj = {
            id:editandoId || Date.now(),
            nomeCurso: nomeCurso,
            nivelCurso: nivelCurso,
            modulos:modulos,
            maquinasSelecionadas: maquinasSelecionadas,
            disponivel: disponivel,
            conteudoCurso: conteudoCurso,
            dataCriacao: new Date().toLocaleDateString('pt-br')
        }
        const cursosSalvos = JSON.parse(localStorage.getItem('cursos') || '[]');
        if (editandoId){
            const idx = cursosSalvos.findIndex(c => String(c.id) === String(editandoId));
            if (idx > -1) 
                cursosSalvos[idx] = cursoObj;
            else cursosSalvos.push(cursoObj);
            alert ("Curso atualizado com sucesso!");
        } else{
            cursosSalvos.push(cursoObj);
            alert("Curso salvo com sucesso!");
        }
        
        localStorage.setItem('cursos', JSON.stringify(cursosSalvos))
            
        setNomeCurso("");
        setNivelCurso("");
        setModulos([]);
        setMaquinasSelecionadas([]);
        setConteudoCurso("");
        setDisponivel(true);
        setMaquinas([]);
        navigate('/IniciarJornada');    
    }

    let estiloMenuLateral = {
        minHeight:"calc(100vh - 150px)",
        maxWidth:"30vh",
        minWidth:"15vh",
        backgroundColor:"#0055A0",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        gap: "10px",
        paddingTop: "10px"
    }

    let estiloBotao = {
        border: "none",
        backgroundColor:"#0055A0",
        cursor: "pointer"
    }

    let estiloInput = {
        border: "none",
        borderBottom:"2px solid #f7db12",
        backgroundColor:"#0055A0",
        color:"#FCFEFF",
        padding:"5px",
        fontSize: "20px",
    }

    let estiloSelect = {
        padding: "5px",
        color:"#f7db12",
        border: "none",
        backgroundColor:"#0055A0",
        fontSize:"20px"
    }

    return (
    <div>
        <Menu>
            <span>
                <input
                    className="inputCurso" 
                    style={{
                        border: "none",
                        borderBottom:"2px solid #f7db12",
                        backgroundColor:"#0055A0",
                        color:"#f7db12",
                        padding:"5px",
                        fontSize: "20px",
                    }}
                    type="text"
                    value={nomeCurso}
                    placeholder="Insira o nome do curso"
                    onChange={(e)=> setNomeCurso(e.target.value)}
                    disabled={readOnly}
                />
            </span>

            <span>
                {!readOnly ? (
                    <label style={{ color: '#f7db12' }}>
                        <input
                            type="checkbox"
                            checked={disponivel}
                            onChange={(e) => setDisponivel(e.target.checked)}
                            style={{ marginRight: 6 }}
                        />
                        Disponível
                    </label>
                ) : (
                    <p style={{ color: '#f7db12', margin: 0 }}>Disponível: {disponivel ? 'Sim' : 'Não'}</p>
                )}
            </span>

            <span>
                <select
                    style={estiloSelect}
                    value={nivelCurso}
                    onChange={(e) => setNivelCurso(e.target.value)}
                    disabled={readOnly}
                >
                    <option value="">Selecione o nível do curso</option>
                    <option value="basico">Básico</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                </select>
            </span>

            {!readOnly && (
                <button style={estiloBotao} onClick={abrirModalMaquina}>
                    <FontAwesomeIcon icon="fa-solid fa-truck-monster" size="2xl" style={{color: "#f7db12"}}/>
                </button>
            )}
        </Menu>
        <div style={{ display: "flex", minHeight: "calc(100vh - 150px)" }}>
            <div style={estiloMenuLateral}>
                {modulos.map((modulo) => (
                    <div 
                        key={modulo.id}
                        style={{
                            color: "#f7db12",
                            width: "90%",
                            borderBottom: "1px solid #f7db12",
                            paddingBottom: "5px",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "normal",
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "flex-start",
                            gap:"10px"
                        }}
                    >
                        <div style={{flex:1}}>
                            <strong>{modulo.nome}</strong>
                            <p style={{ fontSize: "12px", margin:"5px 0"}}>{modulo.descricao}</p>
                        </div>
                        <div style={{display:"flex", gap:"5px"}}>
                            {!readOnly && (
                                <>
                                    <button style={{background:"none", border:"none", cursor:"pointer"}}
                                        onClick={() => editarModulo(modulo)}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-pencil" style={{color: "#f7db12",}} />
                                    </button>
                                    <button
                                        onClick={()=> deletarModulo(modulo.id)}
                                        style={{background:"none", border:"none", cursor:"pointer"}}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-trash" style={{color: "#f7db12",}} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                {!readOnly && (
                    <button style={estiloBotao} type="button" onClick={abrirModal}>
                        <FontAwesomeIcon icon="fa-solid fa-circle-plus" size="3x" style={{color: "#f7db12"}} />
                    </button>
                )}
            </div>
            <div
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    padding: "10px",
                    display: "flex",       
                    flexDirection: "column" 
                }}
            >
                {!readOnly ? (
                    <>
                        <EditorQuill
                            value={conteudoCurso}
                            onChange={setConteudoCurso}
                        />
                        <button 
                            style={{
                                border:"none",
                                backgroundColor:"#fff",
                                padding:"5px"
                            }}
                            type="button"
                            onClick={() => salvarCurso(nomeCurso, nivelCurso, maquinasSelecionadas)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-circle-check" size="4x" style={{color: "#0055a0ff",}} />
                        </button>
                    </>
                ) : (
                    <div>
                        <div style={{ background: '#fff', padding: 12, borderRadius: 6 }} dangerouslySetInnerHTML={{ __html: conteudoCurso || '<p>Sem conteúdo</p>' }} />
                        <div style={{ marginTop: 8 }}>
                            <button
                                onClick={() => navigate('/IniciarJornada')}
                                style={{ padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
                            >Voltar</button>
                        </div>
                    </div>
                )}
            </div>
          
        </div>
        {modalIsOpen && (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <h2>{moduloEmEdicao ? "Editar módulo" : "Cadastro do módulo"}</h2>
                    <form className="form-modal">
                        <label>
                            Nome do módulo
                            <input 
                                type="text"
                                value={moduloCurso}
                                onChange={(e)=> setModuloCurso(e.target.value)}
                            />
                        </label>
                        <label>
                            Descrição do módulo
                            <textarea
                                className="textarea-modal"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva o módulo"
                                rows={4}
                            />
                        </label>
                    </form>
                    <button onClick={fecharModal}>Fechar</button>
                    <button onClick={salvar}>{moduloEmEdicao ? "Atualizar" : "Salvar"}</button>
                </div>
            </div>
        )}  
        {modalMaquinaIsOpen && (
            <div className="modal-backdrop">
                <div className="modal-content" style={{maxHeight:"80vh", overflow:"auto"}}>
                    <div style={{display:"flex", gap:"10px", marginBottom:"15px", borderBottom:"2px solid #0055A0"}}>
                        <button
                            onClick={() => setAbaMaquina("listar")}
                            style={{
                                padding:"10px 20px",
                                background:abaMaquina === "listar" ? "#0055A0" : "transparent",
                                color: abaMaquina === "listar" ? "#f7db12" : "white",
                                border: "none",
                                cursor: "pointer",
                                fontWeight:"bold",
                                borderBottom: abaMaquina === "listar" ? "3px solid #f7db12" : "none"
                            }}
                        >
                            Listar Máquinas
                        </button>
                        <button
                            onClick={() => setAbaMaquina ("cadastrar")}
                            style={{
                                padding:"10px 20px",
                                background: abaMaquina === "cadastrar" ? "#0055A0" : "transparent",
                                color: abaMaquina === "cadastrar" ? "#f7db12" : "white",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "bold",
                                borderBottom: abaMaquina === "cadastrar" ? "3px solid #f7db12" : "none"
                            }}
                        >
                            Cadastrar Máquina
                        </button>
                    </div>
                    {abaMaquina === "listar" && (
                        <div>
                            <h2>Selecione as máquinas que fazem parte do curso</h2>

                            {maquinas.length === 0 ? (
                                <p style={{textAlign:"center", color:"#999", padding:"20px"}}>
                                    Nenhuma máquina cadastrada.
                                    <br/>
                                    <button
                                        onClick={() => setAbaMaquina("cadastrar")}
                                        style={{ 
                                            background: "none", 
                                            border: "underline", 
                                            color: "white", 
                                            cursor: "pointer",
                                            textDecoration: "underline"
                                        }}
                                    >
                                        Clique aqui para cadastrar
                                    </button>
                                </p>
                            
                            ):(
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    {maquinas.map(maquina => (
                                        <div 
                                            key={maquina.id}
                                            style={{
                                                display:"flex",
                                                alignItems:"center",
                                                padding:"10px",
                                                border:"1px solid #ddd",
                                                borderRadius: "5px",
                                                backgroundColor: maquinasSelecionadas.includes(maquina.id) ? "#e3f2fd" : "#fff"
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={maquinasSelecionadas.includes(maquina.id)}
                                                onChange={() => toggleMaquinaSelecionada(maquina.id)}
                                                disabled={readOnly}
                                                style={{ marginRight: "10px", cursor: "pointer", width: "18px", height: "18px" }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <strong>{maquina.linhaEquipamento}</strong>
                                                <p style={{ margin: "5px 0", fontSize: "14px", color: "#666" }}>
                                                    {maquina.modeloEquipamento}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end"}}>
                                <button
                                    onClick={fecharModalMaquina}
                                    style={{padding: "10px 20px", background: "#999", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}  
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("Máquinas Selecionadas:", maquinasSelecionadas)
                                        fecharModalMaquina()
                                    }}
                                    style={{ padding: "10px 20px", background: "#0055A0", color: "#f7db12", border: "none", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}
                                >
                                    Confirmar Seleção   
                                </button>
                            </div>
                        </div>
                    )} 
                    {abaMaquina === "cadastrar" &&(
                        <div>
                            <h2>{maquinaEmEdicao ? "Editar máquina" : "Cadastro de máquina"}</h2>
                            <form className="form-modal">
                                <label>
                                    Linha de equipamento
                                    <select
                                        value={linhaEquipamento}
                                        onChange={(e) => setLinhaEquipamento(e.target.value)}
                                        style={{padding:"6px", fontSize:"16px", backgroundColor:"#f7db12c"}}
                                    >
                                        <option value="">Selecione a linha</option>
                                        <option value="vibroacabadora">Vibroacabadora</option>
                                        <option value="usina">Usina</option>
                                    </select>
                                </label>
                                <label>
                                    Modelo de Equipamento
                                    <input
                                        type="text"
                                        value={modeloEquipamento}
                                        onChange={(e) => setModeloEquipamento(e.target.value)}
                                        placeholder="Ex: VDA 400 Max"
                                    />
                                </label>
                            </form>
                            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <button
                                    onClick={() => setAbaMaquina("listar")}
                                    style={{ padding: "10px 20px", background: "#999", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}
                                >
                                    Voltar
                                </button>
                                <button
                                    onClick={salvarMaquina}
                                    style={{ padding: "10px 20px", background: "#0055A0", color: "#f7db12", border: "none", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}
                                >
                                    {maquinaEmEdicao ? "Atualizar" : "Salvar"} Máquina
                                </button>
                            </div>
                        </div>
                    )}
                </div>     
            </div>
        )}  
    </div>
    )
}

export default CriarCurso;