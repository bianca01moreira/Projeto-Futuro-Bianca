import logo from './assets/imagens/logo.png';
function Menu({children}) {
    let estiloHeader = {
        minHeight:"150px",  
        backgroundColor:"#0055A0",
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

