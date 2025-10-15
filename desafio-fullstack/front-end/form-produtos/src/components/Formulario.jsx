// Formulario.jsx

import { useState, useRef } from "react";
// Icones
import {Package, DollarSign, FileText, CheckCircle} from 'lucide-react';
import "./Formulario.css";      // import do CSS puro
import Footer from "./Footer";

export default function FormularioProdutos() {
    const [dadosForm, setDadosForm] = useState({
        nomeProduto: "",
        precoProduto: "",
        descricaoProduto: "",
        imagemProduto: null,
    });

    const [visualImagem, setVisualImagem] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [sucesso, setSucesso] = useState(false);
    const inputImagemRef = useRef(null);

    const lidarComEntradaDeDados = (e) => {
        const { name, value } = e.target;
        setDadosForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const lidarComImagem = (e) => {
        const arqImagem = e.target.files[0];

        if (arqImagem && (arqImagem.type === "image/png" || arqImagem.type === "image/jpeg")) {
        setDadosForm((prev) => ({
            ...prev,
            imagemProduto: arqImagem,
        }));

        const lerArquivo = new FileReader();
        lerArquivo.onload = () => {
            setVisualImagem(lerArquivo.result);
        };
        lerArquivo.readAsDataURL(arqImagem);
        } else {
            alert("Por favor, selecione apenas arquivos PNG ou JPG");
        }
    };

    const lidarComEnvio = (e) => {
        e.preventDefault();

        if (!dadosForm.nomeProduto || !dadosForm.precoProduto || !dadosForm.descricaoProduto || !dadosForm.imagemProduto) {
            alert("Por favor, preencha todos os campos do formulário");
            return;
        }

        const novoProduto = {
            id: Date.now(),
            nomeProd: dadosForm.nomeProduto,
            precoProd: parseFloat(dadosForm.precoProduto),
            descricaoProd: dadosForm.descricaoProduto,
            imagemProd: visualImagem,
            nomeArq: dadosForm.imagemProduto.name,
        };

        setProdutos((prev) => [...prev, novoProduto]);
        setDadosForm({
            nomeProduto: "",
            precoProduto: "",
            descricaoProduto: "",
            imagemProduto: null,
        });
        setVisualImagem(null);
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);

        // Limpa o campo de arquivo
        if (inputImagemRef.current) {
            inputImagemRef.current.value = '';
        }
    };

    const limparFormulario = () => {
        setDadosForm({
            nomeProduto: "",
            precoProduto: "",
            descricaoProduto: "",
            imagemProduto: null,
        });
        setVisualImagem(null);

        // Limpa o campo de arquivo
        if (inputImagemRef.current) {
            inputImagemRef.current.value = '';
        }
    };

  return (
    <div className="pagina">
        <header>
            <h1>TagProducts</h1>
            <h2>Teste para Desenvolvedor FullStack da Tagview</h2>
        </header>
        
      <div className="container">
        <div className="card">
          <div className="titulo">
            <h1>Formulário de Cadastro de Produtos</h1>
          </div>

          {sucesso && (
            <div className="alerta-sucesso">
              <span>Produto cadastrado com sucesso!</span>
            </div>
          )}

          <form onSubmit={lidarComEnvio}>
            <label>
              <span>
                Nome do Produto
              </span>
              <input
                type="text"
                name="nomeProduto"
                value={dadosForm.nomeProduto}
                onChange={lidarComEntradaDeDados}
                placeholder="Informe o nome do produto"
              />
            </label>

            <label>
              <span>
                Preço do Produto (em R$)
              </span>
              <input
                type="number"
                name="precoProduto"
                value={dadosForm.precoProduto}
                onChange={lidarComEntradaDeDados}
                step="0.01"
                min="0"
                placeholder="Informe o preço do produto"
              />
            </label>

            <label>
              <span>
                Descrição Completa do Produto
              </span>
              <textarea
                name="descricaoProduto"
                value={dadosForm.descricaoProduto}
                onChange={lidarComEntradaDeDados}
                rows="5"
                placeholder="Descreva as características do produto..."
              />
            </label>

            <label>
              <span>
                Imagem do Produto (PNG ou JPG)
              </span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={lidarComImagem}
                ref={inputImagemRef}
              />
            </label>

            {visualImagem && (
              <div className="preview">
                <p>Pré-visualização da Imagem:</p>
                <img src={visualImagem} alt="Preview" />
              </div>
            )}

            <button type="submit" className="botao-cadastrar">Cadastrar Produto</button>
            <button type="button" className="botao-limpar" onClick={limparFormulario}>Limpar Formulário</button>

          </form>
        </div>

        {produtos.length > 0 && (
          <div className="card">
            <h2>Produtos Cadastrados</h2>
            <div className="lista-produtos">
              {produtos.map((produto) => (
                <div key={produto.id} className="item-produto">
                  <img src={produto.imagemProd} alt={produto.nomeProd} />
                  <div>
                    <p>Nome: {produto.nomeProd}</p>
                    <p className="preco">
                      Preço: R$ {produto.precoProd.toFixed(2).replace(".", ",")}
                    </p>
                    <p>Descrição: {produto.descricaoProd}</p>
                    <p className="arquivo">Nome do arquivo: {produto.nomeArq}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>

  );
}
