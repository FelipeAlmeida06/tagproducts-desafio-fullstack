import { useEffect, useState } from 'react'
import './App.css'

import FormularioProdutos from './components/Formulario'
import CardsProdutos from './components/Cards'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Função para buscar produtos
  const buscarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/produtos');

      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      }
    }
    catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    } finally {
      setCarregando(false);
    }
  }

  // Função para adicionar produtos (será chamada após sucesso no back-end)
  const adicionarProduto = (novoProdutoCadastrado) => {
    setProdutos(prev => [...prev, novoProdutoCadastrado]);
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
            carregando ? (
              <div>Carregando produtos...</div>
            ) : (
              <CardsProdutos produtos={produtos} />
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App