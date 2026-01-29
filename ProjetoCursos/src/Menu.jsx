import logo from './assets/imagens/logo.png';
function Menu({children}) {
    let estiloHeader = {
        minHeight:"150px",  
        backgroundColor:"#0055A0",
        display:"flex",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingRight:"40px",
        paddingLeft:"20px",
        color:"#FCFEFF",
        fontSize:"20px"
    }
    return(
        <div style={estiloHeader}>
            <img 
                src={logo} 
                style={{
                    maxWidth: "180px", 
                    maxHeight:"150px", 
                }}
            />
            {children}  
        </div>
    )
}
export default Menu;

