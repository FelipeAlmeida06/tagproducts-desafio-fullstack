import { useState } from 'react'
import './App.css'

import FormularioProdutos from './components/Formulario'
import CardsProdutos from './components/Cards'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [produtos, setProdutos] = useState(() => {
    // Tenta carregar produtos do localStorage se existirem
    const produtosSalvos = localStorage.getItem("produtos");
    return produtosSalvos ? JSON.parse(produtosSalvos) : [];
  })

  // Função para adicionar produtos (ela será passada para o Formulário)
  const adicionarProduto = (novoProdutoCadastrado) => {
    const produtosAtualizados = [...produtos, novoProdutoCadastrado];
    setProdutos(produtosAtualizados);
    // Salva no localStorage para persistir os dados
    localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));
  };

  return (
    <Router>
      <Routes>
        {/* Rota do Formulário */}
        <Route 
          path="/" 
          element={
            <FormularioProdutos 
              onAdicionarProduto={adicionarProduto}
              produtos={produtos}
            />
          } 
        />

        {/* Rota para Exibir Produtos */}
        <Route 
          path="/produtos/exibir" 
          element={
            <CardsProdutos produtos={produtos} />
          } 
        />

      </Routes>
    </Router>
  )
}

export default App