// Cards.jsx

// instalar: npm install react-router-dom

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate} from "react-router-dom";
import {X} from "lucide-react";

import "./Cards.css"
import PaginacaoProdutos from "./Paginacao";

export default function CardsProdutos({produtos}) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [modalAberto, setModalAberto] = useState(false);
    const [prodSelecionado, setProdSelecionado] = useState(null);


    // Paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [limite, setLimite] = useState(10);

    const totalPaginas = Math.ceil(produtos.length / limite);
    const inicio = (paginaAtual - 1) * limite;
    const fim = inicio + limite;
    const produtosExibidos = produtos.slice(inicio, fim);


    // Verifica se há um idProduto na URL ao carregar a página
    useEffect(() => {
        const idProduto = searchParams.get("idProduto");
        if (idProduto) {
            const produto = produtos.find(p => p.id === parseInt(idProduto));
            if (produto) {
                setProdSelecionado(produto);
                setModalAberto(true);
            }
        }
    }, [searchParams, produtos]);

    // Abrir modal de produtos
    const abrirModal = (produto) => {
        setProdSelecionado(produto);
        setModalAberto(true);
        // Atualiza a URL com o ID do produto
        navigate(`/produtos/exibir?idProduto=${produto.id}`);
    };

    // Fechar modal de produtos
    const fecharModal = () => {
        setModalAberto(false);
        setProdSelecionado(null);
        // Remove o query param da URL
        navigate("/produtos/exibir");
    };

    const voltar = () => {
        navigate("/");
    };

    const irParaAnterior = () => setPaginaAtual((p) => Math.max(p - 1, 1));
    const irParaProximo = () => setPaginaAtual((p) => Math.min(p + 1, totalPaginas));
    const alterarLimite = (novoLimite) => {
        setLimite(novoLimite);
        setPaginaAtual(1);
    };

    const imagemFallback = "";

    return (
        <div className="pagina">
            <header>
                <h1>TagProducts</h1>
                <h2>Teste para Desenvolvedor FullStack da Tagview</h2>
            </header>

            <div className="container-exibir">
                <div className="botao-voltar">
                    <button onClick={voltar} className="btn-voltar">
                        ← Voltar para o Formulário
                    </button>
                </div>

                {produtos.length === 0 ? (
                    <div className="sem-produtos">
                        <p>Nenhum produto cadastrado ainda.</p>
                        <p>Acesse o <strong>Formulário de Cadastro</strong> para adicionar produtos.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="titulo-lista">
                            Produtos Cadastrados ({produtos.length})
                        </h2>

                        {/* 🔹 Lista de produtos paginada */}
                        <div className="grid-cards">
                            {produtosExibidos.map((produto) => (
                                <div
                                key={produto.id}
                                className="card-produto"
                                onClick={() => abrirModal(produto)}
                                >
                                <div className="card-imagem">
                                    <img
                                    src={produto.imagemProd || imagemFallback}
                                    alt={produto.nomeProd}
                                    />
                                </div>
                                <div className="card-info">
                                    <h3>{produto.nomeProd}</h3>
                                    <p className="card-preco">
                                    R$ {produto.precoProd.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>
                                <div className="card-hover">
                                    <span>Mais detalhes sobre o produto</span>
                                </div>
                                </div>
                            ))}
                        </div>

                        {/* 🔹 Componente de paginação */}
                        <PaginacaoProdutos
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            limite={limite}
                            onAlterarLimite={alterarLimite}
                            onPaginaAnterior={irParaAnterior}
                            onPaginaProxima={irParaProximo}
                        />
                    </div>
                )}
            </div>


            {/* Modal */}
            {modalAberto && prodSelecionado && (
                <div className="modal-overlay" onClick={fecharModal}>
                    <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="botao-fechar"
                            onClick={fecharModal}
                            aria-label="Fechar modal"
                        >
                            <X size={24} />
                        </button>

                        <div className="modal-imagem">
                            <img
                                src={prodSelecionado.imagemProd || imagemFallback}
                                alt={prodSelecionado.nomeProd}
                            />
                        </div>

                        <div className="modal-info">
                            <h3>Nome: {prodSelecionado.nomeProd}</h3>
                            
                            <h3 className="">
                                Preço: R$ {prodSelecionado.precoProd.toFixed(2).replace(".", ",")}
                            </h3>

                            <div className="modal-descricao">
                                <h3>Descrição:</h3>
                                <p>{prodSelecionado.descricaoProd}</p>
                            </div>

                            <p className="modal-arquivo">
                                <strong>Arquivo da imagem:</strong> {prodSelecionado.nomeArq}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}