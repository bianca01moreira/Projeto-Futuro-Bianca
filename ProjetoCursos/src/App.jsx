import Login from "./Login"
import {Routes, Route, Link} from 'react-router-dom'
import './global.css'
import SolicitarAcesso from "./Paginas/SolicitarAcesso"
import TelaInicio from "./Paginas/telaInicio"
import CriarCurso from "./Paginas/Administracao/CriarCurso"
import IniciarJornada from "./Paginas/DarCurso/IniciarJornada"
import Solicitacoes from "./Paginas/Administracao/Solicitacoes"

function App() {
  let estiloFundo = {
    minHeight:"100vh",
    backgroundColor: "#F4F4F4",
  }
  return (
    <div style={estiloFundo}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/SolicitarAcesso" element={<SolicitarAcesso/>}/>
        <Route path="/telaInicio" element={<TelaInicio/>}/>
        <Route path="/CriarCurso" element={<CriarCurso/>} />
        <Route path="IniciarJornada" element={<IniciarJornada/>}/>
        <Route path="/Solicitacoes" element={<Solicitacoes/>}/>
      </Routes>
    </div>
  )
}

export default App
