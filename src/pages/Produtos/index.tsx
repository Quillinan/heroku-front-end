import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import api from '../../services/api';

import moment from 'moment';

interface IProduto {
  id: number;
  name: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

const Produtos: React.FC = () => {
  const history = useHistory();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [produtoPerPage] = useState(5);

  useEffect(() => {
    loadProdutos();
  }, []);

  // Função que carrega os produtos da api
  async function loadProdutos() {
    const response = await api.get('/produtos');
    setProdutos(response.data);
    console.log(response.data);
  }

  //Função que apaga os produtos da api
  async function removeProduto(id: number) {
    await api.delete(`/produtos/${id}`);
    loadProdutos();
  }

  // Formatação da data
  function formateDate(date: Date) {
    return moment(date).format('DD/MM/YYYY');
  }

  // Formatação do preço
  function formatePrice(price: Number) {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  //Função que edita os produtos da api
  function editProduto(id: number) {
    history.push(`/produtos_cadastro/${id}`);
  }

  //Função que direciona para a info do produto com id
  function viewProduto(id: number) {
    history.push(`/produtos/${id}`);
  }

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);
  const indexOfLastProduto = currentPage * produtoPerPage;
  const indexOfFirstProduto = indexOfLastProduto - produtoPerPage;
  const currentProduto = produtos.slice(
    indexOfFirstProduto,
    indexOfLastProduto
  );
  const totalProdutos = produtos.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProdutos / produtoPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="text-center">
        <br />
        <h1> Lista de produtos </h1>
        <br />
        <Table striped bordered hover variant="dark" className="text-center">
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
            {currentProduto.map((produto) => (
              <tr>
                <td>{produto.id}</td>
                <td>{produto.name}</td>
                <td>{formatePrice(produto.price)}</td>
                <td>{formateDate(produto.created_at)}</td>
                <td>{formateDate(produto.updated_at)}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => viewProduto(produto.id)}
                    variant="info"
                  >
                    Ver
                  </Button>{' '}
                  <Button size="sm" onClick={() => editProduto(produto.id)}>
                    Editar
                  </Button>{' '}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => removeProduto(produto.id)}
                  >
                    Apagar
                  </Button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <nav>
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Produtos;
