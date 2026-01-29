import Menu from "../../Menu.jsx"
import {useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function CriarCurso(){

    //hook
    const[nomeCurso, setnomeCurso] = useState("Nome do Curso")
    const[nivelCurso, setnivelCurso] = useState("Nível do curso")

    const[moduloCurso, setModuloCurso] = useState("")
    const[aula, setAula] = useState("")

    let estiloMenuLateral = {
        minHeight:"calc(100vh - 150px)",
        maxWidth:"30vh",
        minWidth:"15vh",
        backgroundColor:"#0055A0",
        display: "flex",
        justifyContent:"space-evenly",
        flexDirection:"column"
    }
    let estiloBotao = {
        border: "none",
        backgroundColor:"#0055A0",
    }
    return (
    <div>
        <Menu>
            <span>{nomeCurso}</span>
            <span>{nivelCurso}</span>
        </Menu>
        <div style={estiloMenuLateral}>
            <button style={estiloBotao}><FontAwesomeIcon icon="fa-solid fa-circle-plus" size="3x" style={{color: "#f7db12",}} /></button>
        </div>
    </div>
    )
}
export default CriarCurso;