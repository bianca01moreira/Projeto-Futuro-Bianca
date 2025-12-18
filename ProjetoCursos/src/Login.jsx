import { useState } from "react";

let estilo = {
    height:"100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
let estiloLogin = {
    paddingTop: "30px",
    padding:"30px",
    display:"flex",
    flexDirection: "column",
    gap:"20px",
    backgroundColor: "#0055A0",
    width:"250px",
    height:"250px",
    color:"#FCFEFF",
    border: "none",
    borderRadius:"5px"
}

let estiloInput = {
    border: "none",
    borderRadius: "5px",
    height:"25px",
    width:"90%",
    padding:"5px",
}
let estiloButton = {
    border: "none",
    borderRadius: "5px",
    backgroundColor:"#F7DB12",
    padding: "10px",
}
function Login(){

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

function Enviar  () {

    if(usuario === "" || senha === ""){
        setMensagem ("você deve preencher todos os dados!")
    }
    else{
        
    }
}
  return(
  <div style={estilo}>
    <form style={estiloLogin}>
        <label>Usuário:
            <input style={estiloInput}
                type="email"
                name="usuario" 
                value={usuario} 
                placeholder="Digite seu email" 
                onChange={ (e) => setUsuario(e.target.value)}
            />
        </label>
        <label>Senha:
            <input style={estiloInput}
                type="password" 
                name="senha" 
                value={senha} 
                placeholder="Digite sua senha" 
                onChange={ (e) => setSenha(e.target.value)}
            />
        </label>
        <button style={estiloButton} onClick={Enviar} type="button">Entrar</button>
        <p>{mensagem}</p>
    </form>
  </div>
)}  

export default Login;