import logo from '../../assets/imagens/logo.png';

function IniciarJornada(){

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
    </div>
    )
}
export default IniciarJornada;