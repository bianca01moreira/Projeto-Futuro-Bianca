import {Routes, Route, Link, useNavigate} from 'react-router-dom'

let estilo = {
    height:"100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0055A0",
}
let estiloBotao = {
    backgroundColor:"#FFFFFF",
    width:"400px",
    height:"400px",
    border: "none",
    borderRadius:"10px"
}
let estiloAlinhamento = {
    display: "flex",
    justifyContent: "space-evenly",
    width:"80vw"
}

function TelaInicio(){  
    const navigate = useNavigate();
    return(
        <div style={estilo}>
            <div style={estiloAlinhamento}>
                <button style={estiloBotao} onClick={() => navigate("/IniciarJornada")}>Iniciar Jornada</button>
                <button style={estiloBotao} onClick={() => navigate("/CriarCurso")}>Criar Curso</button>
           </div>
        </div>
    )
}
export default TelaInicio;
