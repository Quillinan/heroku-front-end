import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  // valor para rota para navegação
  const history = useHistory();

  // envia para página do formulário
  function newProduto() {
    history.push('/produtos_cadastro');
  }

  return (
    <div className="overlay">
      <div className="text-center">
        <br />
        <h1> Cadastre aqui seus produtos </h1>
        <br />
      </div>
      <div className="text-center">
        <Button variant="primary" size="lg" active onClick={newProduto}>
          Cadastre seu produto
        </Button>
      </div>
    </div>
  );
};

export default Home;
