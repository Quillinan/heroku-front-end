import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import api from '../../../services/api';

interface IProduto {
  name: string;
  price: number;
}

const Produtos: React.FC = () => {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<IProduto>({
    name: '',
    price: 0,
  });

  useEffect(() => {
    if (id !== undefined) {
      findProduto(id);
    }
  }, [id]);

  // Função para edição de produto
  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  // Função de volta na navegação
  function back() {
    history.goBack();
  }

  // Limpa ip do console da página
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`produtos/${id}`, model);
    } else {
      const response = await api.post('/produtos', model);
    }
    back();
  }

  // Função que chama todos os produtos da api
  async function findProduto(id: string) {
    const response = await api.get(`produtos/${id}`);
    setModel({
      name: response.data.name,
      price: response.data.price,
    });
  }

  return (
    <>
      <div className="text-center">
        <br />
        <h1> Cadastre o seu produtos </h1>
        <br />
      </div>
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={model.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={model.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>
          <br />
          <Button variant="success" type="submit" active>
            Enviar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Produtos;
