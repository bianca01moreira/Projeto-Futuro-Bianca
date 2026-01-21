import { useState } from "react";
import imagemLogin from '../assets/imagens/imagemLogin.png';

let estilo = {
    paddingTop: "30px",
    padding:"30px",
    display:"flex",
    flexDirection: "column",
    gap:"20px",
    backgroundColor: "#0055A0",
    width:"300px",
    height:"450px",
    color:"#FCFEFF",
    border: "none",
    borderRadius:"10px"
}
let estiloFundo = {
    minHeight:"100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.8) 100%),
    url(${imagemLogin})`,
    backgroundSize: "cover",
}

let estiloInput = {
    border: "none",
    borderRadius: "5px",
    height:"25px",
    width:"90%",
    padding:"5px",
    marginTop:"3px",
}
let estiloButton = {
    border: "none",
    borderRadius: "5px",
    backgroundColor:"#F7DB12",
    padding: "10px",
    width:"280px"
}
function SolicitarAcesso(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [cpf, setCpf] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [mensagem, setMensagem] = useState("");

    function Enviar  () {
        if(nome === "" || email === "" || cargo === "" || cpf === "" || empresa === ""){
            setMensagem ("Você deve preencher todos os dados!")
        }
        else{
            setMensagem (nome +" sua solicitação foi enviada!")
            setNome("");
            setEmail("");
            setCpf("");
            setCargo("");
            setEmpresa("");
        }
    }
    return (
        <div style={estiloFundo}>
            <form style={estilo}>
                <label>Nome:
                    <input
                        style={estiloInput}
                        type="text"
                        name="nome" 
                        value={nome} 
                        placeholder="Digite seu nome" 
                        onChange={ (e) => setNome(e.target.value)}
                    />
                </label>
                <label>Email:
                    <input
                        style={estiloInput}
                        type="email"
                        name="email" 
                        value={email} 
                        placeholder="Digite seu email" 
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </label>
                <label>CPF:
                    <input
                        style={estiloInput}
                        type="text"
                        name="cpf" 
                        value={cpf} 
                        placeholder="Digite seu CPF" 
                        onChange={ (e) => setCpf(e.target.value)}
                    />
                </label>
                <label>Cargo:
                    <input
                        style={estiloInput}
                        type="text"
                        name="cargo" 
                        value={cargo} 
                        placeholder="Digite seu cargo" 
                        onChange={ (e) => setCargo(e.target.value)}
                    />
                </label>
                <label>Empresa:
                    <input
                        style={estiloInput}
                        type="text"
                        name="empresa" 
                        value={empresa} 
                        placeholder="Digite o nome da empresa" 
                        onChange={ (e) => setEmpresa(e.target.value)}
                    />
                </label>
                <button style={estiloButton} type="button" onClick={Enviar}>Enviar Solicitação</button>
                <p>{mensagem}</p>
            </form> 
        </div>
    )
}
export default SolicitarAcesso;