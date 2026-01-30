import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import '../icones.js'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iniciarCurso from '../assets/imagens/iniciarCurso.png';
import criarCurso from '../assets/imagens/criarCurso.png';

let estilo = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0055A0",
}
let estiloBotao = {
    border: "none",
    backgroundColor: "#0055A0",
}
let estiloAlinhamento = {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    width: "100%",
    flexWrap: "wrap"
}
function TelaInicio(){  
    const navigate = useNavigate();
    return(
        <div style={estilo}>
            <div style={estiloAlinhamento}>
                <button style={estiloBotao} onClick={() => navigate("/IniciarJornada")}>
                    <img 
                        src={iniciarCurso} 
                        style={{
                            width: "100%", 
                            maxWidth: "550px", 
                            height: "auto" 
                        }}
                    />  
                </button>
                <button style={estiloBotao} onClick={() => navigate("/CriarCurso")}>
                    <img 
                        src={criarCurso} 
                        style={{
                            width: "100%", 
                            maxWidth: "550px", 
                            height: "auto" 
                        }}
                    />
                </button>
           </div>
        </div>
    )
}
export default TelaInicio;
