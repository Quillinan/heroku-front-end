import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";
import api from "../../../services/api";

import moment from "moment";

interface IProduto {
    id: number;
    name: string;
    price: number;
    created_at: Date;
    updated_at: Date;
}

const Info: React.FC = () => {

    const history = useHistory()
    let { id } = useParams<{id: string}>();
    const [produto, setProduto] = useState<IProduto>()

    useEffect(() => {
        findProduto(id)
    }, [id])

    function back(): void{
        history.goBack()
    }

    async function findProduto(id: string){
        const response = await api.get(`/produtos/${id}`)
        console.log(response)
        setProduto(response.data)
    }

    function formateDate(date: Date | undefined){
        return moment(date).format("DD/MM/YYYY")
    }

    return(
        <div className="text-center">
            <br />
            <h1> Informações do produto </h1>
            <br />

            <Card>
                <Card.Body>
                    <Card.Title>{ produto?.name}</Card.Title>
                    <Card.Text>
                        R${ produto?.price },00
                    <br />
                    <strong>Data de Cadastro: </strong>
                    <Badge bg="primary">
                        { formateDate(produto?.created_at) }
                    </Badge>
                    <br />
                    <strong>Última atualização: </strong>
                    <Badge bg="warning">
                        { formateDate(produto?.updated_at) }
                    </Badge >
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Button variant="dark" 
                type="submit"active
                onClick={() => back()}>
                Voltar
            </Button>
        </div>
        
    );
}

export default Info;