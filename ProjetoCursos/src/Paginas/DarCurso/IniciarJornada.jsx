import logo from '../../assets/imagens/logo.png';
import { useState,useEffect, use } from 'react';
function IniciarJornada(){

    const [cursos, setCursos] = useState([])

    useEffect(() =>{
        const cursosSalvos = JSON.parse(localStorage.getItem('cursos')) || []
        setCursos(cursosSalvos)
    }, [])

    let estiloFundo = {
        minHeight:"100vh",
        backgroundColor: "#F4F4F4",
    }
    let estiloHeader = {
        minHeight:"90px",  
        backgroundColor: "#0055A0",
    }
   
    return (
    <div style={estiloFundo}>
        <div style={estiloHeader}>
            <img 
                src={logo} 
                style={{
                    maxWidth: "180px", 
                    maxHeight:"150px", 
                }}
            />
        </div>
        <div style={{ padding: "20px" }}>
            <h1>Cursos Disponíveis</h1>
            {cursos.length === 0 ? (
                <p>Nenhum curso disponível</p>
            ) : (
                cursos.map((curso) => (
                    <div 
                        key={curso.id}
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                    >
                        <h2>{curso.nomeCurso}</h2>
                        <p><strong>Nível:</strong> {curso.nivelCurso}</p>
                        <p><strong>Módulos:</strong> {curso.modulos.length}</p>
                        <p><strong>Criado em:</strong> {curso.dataCriacao}</p>
                        <button style={{backgroundColor: "#0055A0", color: "#f7db12", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer"}}>
                            Iniciar Curso
                        </button>
                    </div>
                ))
            )}
        </div>
    </div>
    )
}
export default IniciarJornada;