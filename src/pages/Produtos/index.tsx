import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Table, Button} from "react-bootstrap";
import api from "../../services/api";

import moment from "moment";

interface IProduto {
    id: number;
    name: string;
    price: number;
    created_at: Date;
    updated_at: Date;
}

const Produtos: React.FC = () => {

    const history = useHistory()
    const [produtos, setProdutos] = useState<IProduto[]>([])

    useEffect(() => {
        loadProdutos()
    }, [])

    async function loadProdutos(){

        const response = await api.get('/produtos')
        console.log(response)
        setProdutos(response.data)
    }

    async function removeProduto(id: number){
        await api.delete(`/produtos/${id}`)
        loadProdutos()
    }

    function formateDate(date: Date){
        return moment(date).format("DD/MM/YYYY")
    }

    function formatePrice(price: Number){
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

    function editProduto(id: number){
        history.push(`/produtos_cadastro/${id}`)
    }

    function viewProduto(id: number){
        history.push(`/produtos/${id}`)
    }

    return(
        <><div className="text-center">
            <br />
            <h1> Lista de produtos </h1>
            <br />
        </div><Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Data de criação</th>
                        <th>Última atualização</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                    
                    produtos.map(produto => (
                        <tr>
                            <td>{ produto.id }</td>
                            <td>{ produto.name }</td>
                            <td>{ formatePrice(produto.price) }</td>
                            <td>{ formateDate(produto.created_at) }</td>
                            <td>{ formateDate(produto.updated_at) }</td>
                            <td>
                                <Button size="sm" 
                                    onClick={() => viewProduto(produto.id)}
                                    variant="info">Ver</Button>{' '}
                                <Button size="sm"
                                    onClick={() => editProduto(produto.id)}>Editar
                                </Button>{' '}
                                <Button size="sm"
                                 variant="danger"
                                 onClick={() => removeProduto(produto.id)}>Apagar</Button>{' '}
                            </td>
                        </tr>
                    ))
                    
                    }

                </tbody>
            </Table></>
    )
}

export default Produtos;

