import Menu from "../../Menu.jsx"
function CriarCurso(){
    let estiloMenuLateral = {
        minHeight:"calc(100vh - 155px)",
        maxWidth:"30vh",
        minWidth:"15vh",
        backgroundColor:"#0055A0"
    }
    return (
    <div>
        <Menu>aa</Menu>
        <div style={estiloMenuLateral}>
        </div>
    </div>
    )
}
export default CriarCurso;