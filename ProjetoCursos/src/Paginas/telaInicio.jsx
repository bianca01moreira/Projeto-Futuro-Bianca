import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import '../icones.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import iniciarCurso from '../assets/imagens/iniciarCurso.png';
import criarCurso from '../assets/imagens/criarCurso.png';
import Menu from '@/Menu.jsx';

let estilo = {
    minHeight: "calc(100vh - 150px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a5b1bc",
}
let estiloBotao = {
    border: "none",
    backgroundColor: "transparent",
}
let estiloAlinhamento = {
    display: "flex",
    justifyContent: "center",
    margin:"0px",
    gap: "40px",
    width: "100%",
    flexWrap: "wrap"
}
let estiloItemMenu = {
    minWidth:"10%",
    display:"flex",
    justifyContent:"space-around",
}
function TelaInicio(){  
    const navigate = useNavigate();
    return(
        <div>
            <Menu>
                <div style={estiloItemMenu}>
                    <button title='Ver solicitações' style={estiloBotao} onClick={() => navigate("/Solicitacoes")}><FontAwesomeIcon icon="fa-solid fa-bell" size="2xl" style={{color: "rgb(247, 219, 18)",}} /></button>
                    <button title='Sair' style={estiloBotao} onClick={() => navigate("/")}><FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" size="2xl" style={{color: "rgb(247, 219, 18)",}} /></button>
                </div>
            </Menu>
            <div style={estilo}>
                <div style={estiloAlinhamento}>
                    <button title='Ver cursos' style={estiloBotao} onClick={() => navigate("/IniciarJornada")}>
                        <img 
                            src={iniciarCurso} 
                            style={{
                                width: "100%", 
                                maxWidth: "550px", 
                            }}
                        />  
                    </button>
                    <button title='Criar cursos' style={estiloBotao} onClick={() => navigate("/CriarCurso")}>
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
        </div>
    )
}
export default TelaInicio;
