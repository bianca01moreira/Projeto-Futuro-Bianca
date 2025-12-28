import Login from "./Login"
import {Routes, Route, Link} from 'react-router-dom'
import './global.css'
import SolicitarAcesso from "./Paginas/SolicitarAcesso"
import TelaInicio from "./Paginas/telaInicio"
import CriarCurso from "./Paginas/Administracao/CriarCurso"
import IniciarJornada from "./Paginas/DarCurso/iniciarJornada"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/SolicitarAcesso" element={<SolicitarAcesso/>}/>
        <Route path="/telaInicio" element={<TelaInicio/>}/>
        <Route path="/CriarCurso" element={<CriarCurso/>} />
        <Route path="IniciarJornada" element={<IniciarJornada/>}/>
      </Routes>
    </>
  )
}

export default App
