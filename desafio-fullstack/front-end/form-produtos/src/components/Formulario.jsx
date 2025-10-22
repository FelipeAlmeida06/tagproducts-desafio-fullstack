// Formulario.jsx

import { useState, useRef } from "react";
// Icones
import {Package, DollarSign, FileText, CheckCircle} from 'lucide-react';
import "./Formulario.css";      // import do CSS puro

import { useNavigate } from "react-router-dom";

export default function FormularioProdutos({onAdicionarProduto}) {
    const navigate = useNavigate();

    const [dadosForm, setDadosForm] = useState({
        nomeProduto: "",
        precoProduto: "",
        descricaoProduto: "",
        imagemProduto: null,
    });

    const [visualImagem, setVisualImagem] = useState(null);
    //const [produtos, setProdutos] = useState([]);
    const [sucesso, setSucesso] = useState(false);
    const inputImagemRef = useRef(null);

    // Entrada de dados pelo usuário
    const lidarComEntradaDeDados = (e) => {
        const { name, value } = e.target;
        setDadosForm((prev) => ({
        ...prev,
        [name]: value,
        }));
        // Limpa o erro deste campo ao começar a digitar
        if (erros[name]) {
          setErros((prev) => ({
            ...prev,
            [name]: ""
          }))
        }
    };

    // Entrada da imagem pelo usuário
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

    // Envio do formulário
    const lidarComEnvio = (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
          return;
        }

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

        // Chama a função para adicionar o produto
        onAdicionarProduto(novoProduto);

        //setProdutos((prev) => [...prev, novoProduto]);
        setDadosForm({
            nomeProduto: "",
            precoProduto: "",
            descricaoProduto: "",
            imagemProduto: null,
        });
        setVisualImagem(null);
        setErros({});
        setSucesso(true);
        setTimeout(() => setSucesso(false), 3000);

        // Limpa o campo de arquivo
        if (inputImagemRef.current) {
            inputImagemRef.current.value = '';
        }


        /*
        // Fetch - Ligação Front-end e Back-end:
        const formData = new FormData();
        formData.append("nome", dadosForm.nomeProduto);
        formData.append("preco", dadosForm.precoProduto);
        formData.append("descricao", dadosForm.descricaoProduto);

        if (dadosForm.imagemProduto) {
          formData.append("imagem", dadosForm.imagemProduto);
        }


        fetch("http://localhost:3000/api/v1/produtos", {
          method: "POST",
          body: formData,
        })
          .then(async (res) => {
            if (!res.ok) {
              const erro = await res.json();
              throw new Error(erro.erro || "Erro ao cadastrar produto");
            }
            return res.json();
          })
          .then((data) => {
            console.log("Produto criado: ", data);
            alert("Produto cadastrado com sucesso!");
          })
          .catch((err) => {
            console.log(err);
            alert("Falha ao cadastrar produto.");
          });
        */

          
    };

    // Limpa o formulário
    const limparFormulario = () => {
        setDadosForm({
            nomeProduto: "",
            precoProduto: "",
            descricaoProduto: "",
            imagemProduto: null,
        });
        setVisualImagem(null);
        setErros({});

        // Limpa o campo de arquivo
        if (inputImagemRef.current) {
            inputImagemRef.current.value = '';
        }
    };

    const [erros, setErros] = useState({});

    // Validação do formulário
    const  validarFormulario = () => {
      const novosErros = {};

      // Validar Nome (3-50 caracteres é obrigatório)
      if (!dadosForm.nomeProduto.trim()) {
        novosErros.nomeProduto = "Nome do produto é obrigatório";
      } else if (dadosForm.nomeProduto.trim().length < 3) {
        novosErros.nomeProduto = "Nome do produto deve ter mínimo de 3 caracteres";
      } else if (dadosForm.nomeProduto.trim().length > 50) {
        novosErros.nomeProduto = "Nome do produto deve ter máximo de 50 caracteres";
      }

      // Validar Preço (mínimo 10 é obrigatório)
      if (!dadosForm.precoProduto) {
        novosErros.precoProduto = "Preço do produto é obrigatório";
      } else if (parseFloat(dadosForm.precoProduto) < 10) {
        novosErros.precoProduto = "Preço do produto mínimo é de R$ 10,00";
      }

      // Validar Descrição (30-255 caracteres é obrigatório)
      if (!dadosForm.descricaoProduto.trim()) {
        novosErros.descricaoProduto = "Descrição do produto é obrigatória";
      } else if (dadosForm.descricaoProduto.trim().length < 30) {
        novosErros.descricaoProduto = "Descrição do produto deve ter mínimo 30 caracteres";
      } else if (dadosForm.descricaoProduto.trim().length > 255) {
        novosErros.descricaoProduto = "Descrição do produto deve ter máximo 255 caracteres";
      }

      // Validar Imagem (PNG/JPG máximo 5MB é opcional)
      if (dadosForm.imagemProduto) {
        if (dadosForm.imagemProduto.type !== "image/png" && dadosForm.imagemProduto.type !== "image/jpg") {
          novosErros.imagemProduto = "Apenas PNG ou JPG são aceitos"
        } else if (dadosForm.imagemProduto.size > 5 * 1024 * 1024) {
          novosErros.imagemProduto = "Imagem do produto não pode ultrapassar 5MB";
        }
      }

      setErros(novosErros);
      return Object.keys(novosErros).length === 0;
    }

    // Ir para página de exibição
    const irPaginaExibicao = () => {
      navigate("/produtos/exibir");
    }

  return (
    <div className="pagina">

        {sucesso && (
          <div className="alerta-sucesso-flutuante">
            <CheckCircle className="icone-sucesso" size={24} />
            <span>Produto cadastrado com sucesso!</span>
          </div>
        )}

        <header>
            <h1>TagProducts</h1>
            <h2>Teste para Desenvolvedor FullStack da Tagview</h2>
        </header>
        
      <div className="container">
        <div className="card">
          <div className="titulo">
            <h1>Formulário de Cadastro de Produtos</h1>
          </div>

          <form onSubmit={lidarComEnvio}>
            <label>
              <span>
                Nome do Produto
                <small> (3-50 caracteres)</small>
              </span>
              <input
                type="text"
                name="nomeProduto"
                value={dadosForm.nomeProduto}
                onChange={lidarComEntradaDeDados}
                placeholder="Informe o nome do produto"
                className={erros.nomeProduto ? "input-erro" : ""}
              />
              {erros.nomeProduto && <p className="mensagem-erro">{erros.nomeProduto}</p>}
              <small className="contador">{dadosForm.nomeProduto.length}/50</small>
            </label>

            <label>
              <span>
                Preço do Produto (em R$)
                <small> (mínimo: R$ 10,00)</small>
              </span>
              <input
                type="number"
                name="precoProduto"
                value={dadosForm.precoProduto}
                onChange={lidarComEntradaDeDados}
                step="0.01"
                min="0"
                placeholder="Informe o preço do produto"
                className={erros.precoProduto ? "input-erro" : ""}
              />
              {erros.precoProduto && <p className="mensagem-erro">{erros.precoProduto}</p>}
            </label>

            <label>
              <span>
                Descrição Completa do Produto
                <small> (30-255 caracteres)</small>
              </span>
              <textarea
                name="descricaoProduto"
                value={dadosForm.descricaoProduto}
                onChange={lidarComEntradaDeDados}
                rows="5"
                placeholder="Descreva as características do produto..."
                className={erros.descricaoProduto ? "input-erro" : ""}
              />
              {erros.descricaoProduto && <p className="mensagem-erro">{erros.descricaoProduto}</p>}
              <small className="contador">{dadosForm.descricaoProduto.length}/255</small>
            </label>

            <label>
              <span>
                Imagem do Produto (PNG ou JPG)
                <small> (opcional, máximo 5MB)</small>
              </span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={lidarComImagem}
                ref={inputImagemRef}
                className={erros.imagemProduto ? "input-erro" : ""}
              />
              {erros.imagemProduto && <p className="mensagem-erro">{erros.imagemProduto}</p>}
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


        <div className="botoes-navegacao">
          <button className="botao-exibir" onClick={irPaginaExibicao}>
            📦 Ver Produtos Cadastrados
          </button>
        </div>


        {/*
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
        */}

        
      </div>

      <footer className="rodape">
        <p>© 2025 TagProducts — Todos os direitos reservados.</p>
        <p>
          Desenvolvido por <strong>Felipe Almeida</strong>
        </p>
      </footer>
    </div>

  );
}
