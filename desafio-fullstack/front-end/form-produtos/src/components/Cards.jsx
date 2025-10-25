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
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

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
        const novoCadastro = searchParams.get("novo");

        if (idProduto) {
            const produto = produtos.find(p => p.id === parseInt(idProduto));
            if (produto) {
                setProdSelecionado(produto);
                setModalAberto(true);


                // Mostrar mensagem de sucesso
                if (novoCadastro === "true") {
                    setMostrarSucesso(true);
                    setTimeout(() => setMostrarSucesso(false), 3000);
                    // Remove o parâmtro da URL
                    searchParams.delete("novo");
                    setSearchParams(searchParams);
                }
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
        navigate("/produtos/cadastro");
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
            {/* ALERTA DE SUCESSO */}
            {mostrarSucesso && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '15px 25px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    animation: 'slideIn 0.3s ease'
                }}>
                    <CheckCircle size={24} />
                    <span style={{ fontWeight: '600' }}>Novo Produto Cadastrado!</span>
                </div>
            )}

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
                                            src={produto.imagem?.url || produto.imagemProd || imagemFallback}
                                            alt={produto.nome || produto.nomeProd}
                                        />
                                    </div>
                                    <div className="card-info">
                                        <h3>{produto.nome || produto.nomeProd}</h3>
                                        <p className="card-preco">
                                            R$ {typeof produto.preco === 'string' 
                                                ? produto.preco.replace('.', ',')
                                                : (produto.precoProd || produto.preco || 0).toFixed(2).replace(".", ",")}
                                        </p>
                                    </div>
                                    <div className="card-hover">
                                        <span>Mais detalhes sobre o produto</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Paginação */}
                        <PaginacaoProdutos
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            limite={limite}
                            totalProdutos={produtos.length}
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
                                src={prodSelecionado.imagem?.url || prodSelecionado.imagemProd || imagemFallback}
                                alt={prodSelecionado.nome || prodSelecionado.nomeProd}
                            />
                        </div>

                        <div className="modal-info">
                            <h3>Nome: {prodSelecionado.nome || prodSelecionado.nomeProd}</h3>
                            
                            <h3>
                                Preço: R$ {typeof prodSelecionado.preco === 'string'
                                    ? prodSelecionado.preco.replace('.', ',')
                                    : (prodSelecionado.precoProd || prodSelecionado.preco || 0).toFixed(2).replace(".", ",")}
                            </h3>

                            <div className="modal-descricao">
                                <h3>Descrição:</h3>
                                <p>{prodSelecionado.descricao || prodSelecionado.descricaoProd}</p>
                            </div>

                            <p className="modal-arquivo">
                                <strong>Arquivo da imagem:</strong> {
                                    prodSelecionado.imagem?.nome || 
                                    prodSelecionado.nomeArq || 
                                    'Sem arquivo'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}