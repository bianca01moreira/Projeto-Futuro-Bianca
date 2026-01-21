import logo from '../../assets/imagens/logo.png';

function CriarCurso(){
    let estiloFundo = {
        minHeight:"100vh",
        backgroundColor: "#F4F4F4",
    }
    let estiloHeader = {
        minHeight:"90px",  
        backgroundColor:"#0055A0",
    }
    let estiloMenuLateral = {
        minHeight:"100vh",
        maxWidth:"30vh",
        minWidth:"15vh",
        backgroundColor:"#0055A0"
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
        <div style={estiloMenuLateral}>

        </div>
    </div>
    )
}
export default CriarCurso;