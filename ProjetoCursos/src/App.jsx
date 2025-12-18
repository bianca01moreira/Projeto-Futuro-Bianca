import Login from "./Login"
import {Routes, Route, Link} from 'react-router-dom'
import './global.css'
import SolicitarAcesso from "./Paginas/SolicitarAcesso"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/SolicitarAcesso" element={<SolicitarAcesso/>}/>
      </Routes>
    </>
  )
}

export default App
