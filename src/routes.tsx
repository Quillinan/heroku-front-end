import React from "react";
import { Switch, Route} from "react-router-dom";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import ProdutosForm from "./pages/Produtos/Form";
import ProdutoInfo from "./pages/Produtos/Info";


const Routes: React.FC = () => {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/produtos" exact component={Produtos}/>
            <Route path="/produtos_cadastro" exact component={ProdutosForm}/>
            <Route path="/produtos_cadastro/:id" exact component={ProdutosForm}/>
            <Route path="/produtos/:id" exact component={ProdutoInfo}/>
        </Switch>
    );
}

export default Routes;