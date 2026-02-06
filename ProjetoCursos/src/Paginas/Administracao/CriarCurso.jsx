import Menu from "../../Menu.jsx"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./CriarCurso.css";
import './Modal.css';

//para usar o react-quill-new
import EditorQuill from "../../componentes/EditorQuill";


function CriarCurso(){

    // hooks
    const [nomeCurso, setNomeCurso] = useState("")
    const [nivelCurso, setNivelCurso] = useState("")

    //hooks para o modulo do curso
    const [modulos, setModulos] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [moduloCurso, setModuloCurso] = useState("")
    const [descricao, setDescricao] = useState("")
    const [moduloEmEdicao, setModuloEmEdicao] = useState(null)
    //Quando o backend for criado isso será desnecessário
    const[idModulo, setIdModulo] = useState(1)

    //Hook PARA CADASTRO/MODAL DAS MAQUINAS
    const [modalMaquinaIsOpen, setModalMaquinaIsOpen] = useState(false)
    const [nomeMaquina, setNomeMaquina] = useState("")
    const [tipoMaquina, setTipoMaquina] = useState("indefinido")
    const [modeloMaquina, setModeloMaquina] = useState("")
    
    //Quando o backend for criado isso será desnecessário
     const[idMaquina, setIdMaquina] = useState(1)

    //HOOK PARA O REACT QUILL
    const [conteudoCurso, setConteudoCurso] = useState("");

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

    function abrirModal() {
        setModalIsOpen(true)
    }

    function fecharModal() {
        setModalIsOpen(false)
        setModuloEmEdicao(null)
        setModuloCurso("")
        setDescricao("")
    }
    function editarModulo(modulo){
        setModuloEmEdicao(modulo)
        setModuloCurso(modulo.nome)
        setDescricao(modulo.descricao)
        abrirModal()
    }
    function deletarModulo(id){
        setModulos(modulos.filter(modulo => modulo.id !== id))
    }

    function abrirModalMaquina() {
        setModalMaquinaIsOpen(true)
    }

    function fecharModalMaquina() {
        setModalMaquinaIsOpen(false)
        setNomeMaquina("")
        setTipoMaquina("")
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
                    style={estiloInput}
                    type="text"
                    value={nomeCurso}
                    placeholder="Insira o nome do curso"
                    onChange={(e)=> setNomeCurso(e.target.value)}
                />
            </span>

            <span>
                <select
                    style={estiloSelect}
                    value={nivelCurso}
                    onChange={(e) => setNivelCurso(e.target.value)}
                >
                    <option value="">Selecione o nível do curso</option>
                    <option value="basico">Básico</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                </select>
            </span>

            <button style={estiloBotao} onClick={abrirModalMaquina}>
                <FontAwesomeIcon icon="fa-solid fa-truck-monster" size="2xl" style={{color: "#f7db12"}}/>
            </button>
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
                        </div>
                    </div>
                ))}
                <button style={estiloBotao} type="button" onClick={abrirModal}>
                    <FontAwesomeIcon icon="fa-solid fa-circle-plus" size="3x" style={{color: "#f7db12"}} />
                </button>
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
                <EditorQuill
                    value={conteudoCurso}
                    onChange={setConteudoCurso}
                />
            </div>

        </div>
        {modalIsOpen && (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <h2>{moduloEmEdicao ? "Editar módulo/aula" : "Cadastro do módulo/aula"}</h2>
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
                            Descrição do curso
                            <textarea
                                className="textarea-modal"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva o curso"
                                rows={4}
                            />
                        </label>
                    </form>
                    <button onClick={fecharModal}>Fechar</button>
                    <button onClick={salvar}>{moduloEmEdicao ? "Atualizar" : "Salvar"}</button>
                </div>
            </div>
        )}  
    </div>
    )
}

export default CriarCurso;