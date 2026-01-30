import Menu from "../../Menu.jsx"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./CriarCurso.css";
import './Modal.css';

function CriarCurso(){

    // hooks
    const [nomeCurso, setNomeCurso] = useState("")
    const [nivelCurso, setNivelCurso] = useState("")

    const [modulos, setModulos] = useState([])

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [moduloCurso, setModuloCurso] = useState("")
    const [descricao, setDescricao] = useState("")

    function salvar() {
        if (!moduloCurso || !descricao) {
            alert("Preencha todos os campos")
            return
        }

        const novoModulo = {
            nome: moduloCurso,
            descricao: descricao,
        }

        setModulos([...modulos, novoModulo])

        setModuloCurso("")
        setDescricao("")

        fecharModal()
    }

    function abrirModal() {
        setModalIsOpen(true)
    }

    function fecharModal() {
        setModalIsOpen(false)
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

            <button style={estiloBotao}>
                <FontAwesomeIcon icon="fa-solid fa-truck-monster" size="2xl" style={{color: "#f7db12"}}/>
            </button>
        </Menu>

        {modalIsOpen && (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <h2>Cadastro do módulo/aula</h2>

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
                    <button onClick={salvar}>Salvar</button>
                </div>
            </div>
        )}

        <div style={estiloMenuLateral}>

            {modulos.map((modulo, index) => (
                <div 
                    key={index}
                    style={{
                        color: "#f7db12",
                        width: "90%",
                        borderBottom: "1px solid #f7db12",
                        paddingBottom: "5px",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal"
                    }}
                >
                    <strong>{modulo.nome}</strong>
                    <p style={{ fontSize: "12px" }}>{modulo.descricao}</p>
                </div>
            ))}

            <button style={estiloBotao} type="button" onClick={abrirModal}>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" size="3x" style={{color: "#f7db12"}} />
            </button>
        </div>
    </div>
    )
}

export default CriarCurso;