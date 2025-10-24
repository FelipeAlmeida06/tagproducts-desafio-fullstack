import { useEffect, useState } from 'react'
import './App.css'

import FormularioProdutos from './components/Formulario'
import CardsProdutos from './components/Cards'
import PaginaNaoEncontrada from './components/PagNaoExiste'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Função para buscar produtos
  const buscarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/produtos', {
        headers: {
          'X-API-KEY': 'tagview-desafio-2024'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProdutos(data);
      } else if (response.status === 401) {
        console.error("API Key inválida");
        alert("Erro de autenticação: API Key inválida");
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
        {/* Rediciona para produtos/cadastro */}
        <Route 
          path="/" 
          element={<Navigate to="/produtos/cadastro" replace />}  
        />

        {/* Rota do Formulário */}
        <Route 
          path="/produtos/cadastro" 
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

        {/* Rota 404 - Página Não Encontrada */}
        <Route 
          path="*" 
          element={<PaginaNaoEncontrada />} 
        />
        
      </Routes>
    </Router>
  )
}

export default App