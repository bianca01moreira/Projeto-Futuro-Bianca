import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import './Modal.css';

let estiloTabela = {
    backgroundColor: "#e2f1f9",
    border:"1px solid #b2b2b2",
    width:"100%",
    borderCollapse: "collapse",
    textAlign:"center",
}

let estiloDivTabela ={
    width: "90%",
    maxWidth:"1200px",
    overFlowX:"auto",
    marginTop: "50px",
    display: "flex",
    alignItems: "center",
    border:"none",
}

let estiloPagina = {
    backgroundColor:"#0055A0",
    width:"100%",
    minHeight:"100vh",
    display:"flex",
    justifyContent: "center",
    alignItems:"flex-start"
}

let estiloAcoes = {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    border: "none"   
}

let estiloBotao = {
    border: "none",
    backgroundColor:"transparent"
}
let estiloSelect = {
    padding: "5px",
    color:"#f7db12",
    border: "none",
    backgroundColor:"#0055A0",
    fontSize:"20px"
}

function Solicitacoes(){
    const[tabela, setTabela] = useState([])
    const location = useLocation();

    const [itemParaEditar, setItemParaEditar] = useState(null);
    
    //const [tempoPermitido, setTempoPermitido] = useState(0)
    const [cursosPermitidos, setCursosPermitidos] = useState("")
    const [nivelCursoPermitido, setNivelCursoPermititido] = useState("")

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if(location.state){
            const novoItem = {
                id: location.state.id,
                nome: location.state.nome,
                email: location.state.email,
                cpf: location.state.cpf,
                cargo: location.state.cargo,
                empresa: location.state.empresa,
            }
            setTabela(prev => {
                const existe = prev.find(item => item.id === novoItem.id);
                return existe ? prev : [novoItem, ...prev];
            });
        }
    }, [location.state])
    
    const excluir = (id) =>{
        setTabela(tabela.filter(item => item.id !== id));
    }

    function salvar() {
        if (!cursosPermitidos || !nivelCursoPermitido) {
            alert("Preencha todos os campos")
            return
        }
        const dadosFinais = {
        ...itemParaEditar,
        cursos: cursosPermitidos,
        nivel: nivelCursoPermitido
        };
        console.log("Usuário Aceito com sucesso:", dadosFinais);
    
        // Remove da tabela de solicitações após salvar
        excluir(itemParaEditar.id);
        fecharModal();
    }

    function fecharModal() {
        setModalIsOpen(false)
        setItemParaEditar(null);
    }

    const aceitar = (linha) => {
        setItemParaEditar(linha);
        setModalIsOpen(true);
    };
    return(
        <div style={estiloPagina}>
            <div style={estiloDivTabela}>
                <table border="1" style={estiloTabela}>
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Cargo</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tabela.map(
                        (linha) => (
                        <tr key={linha.id}>
                            <td style={{padding:"10px"}}>{linha.nome}</td>
                            <td>{linha.email}</td>
                            <td>{linha.cpf}</td>
                            <td>{linha.cargo}</td>
                            <td>{linha.empresa}</td>
                            <td style={estiloAcoes}>
                                <button style={estiloBotao} title='excluir solicitação' onClick={() => excluir(linha.id)}><FontAwesomeIcon icon="fa-solid fa-trash" size="xl" style={{color: "rgb(202, 5, 5)",}} /></button>
                                <button style={estiloBotao} title='aceitar solicitação' onClick={() => aceitar(linha)}><FontAwesomeIcon icon="fa-solid fa-circle-check" size="xl"  style={{color: "rgb(3, 184, 82)",}} /></button>
                            </td>
                        </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
            {modalIsOpen && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2>Configurar Acesso: {itemParaEditar?.nome}</h2>
                        <form className="form-modal">
                            <label>Cursos permitidos:
                                <input 
                                    type="text"
                                    value={cursosPermitidos}
                                    onChange={(e)=> setCursosPermitidos(e.target.value)}
                                />
                            </label>
                            <label>Nível:
                                <select
                                    style={estiloSelect}
                                    value={nivelCursoPermitido}
                                    onChange={(e) => setNivelCursoPermititido(e.target.value)}
                                >
                                    <option value="">Selecione o nível dos cursos</option>
                                    <option value="Básico">Básico</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                </select>
                            </label>
                        </form>
                        <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                            <button onClick={fecharModal}>Cancelar</button>
                            <button onClick={salvar} style={{backgroundColor: '#03b852', color: 'white'}}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}
export default Solicitacoes;