// Paginacao.jsx

import React from "react";
import "./Paginacao.css"

export default function PaginacaoProdutos({
    paginaAtual,
    totalPaginas,
    limite,
    onAlterarLimite,
    onPaginaAnterior,
    onPaginaProxima,
    totalProdutos
}) 
{
    return (
        <div className="paginacao-container">

            {/* 🔹 Controle de limite */}
            <div className="controle-limite">
                <label>Mostrar: </label>
                <select
                value={limite}
                onChange={(e) => onAlterarLimite(Number(e.target.value))}
                >
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
                <option value={50}>50 por página</option>
                <option value={totalProdutos}>Todos</option>
                </select>
            </div>

            {/* 🔹 Controles de página */}
            <div className="botoes-paginacao">
                <button
                onClick={onPaginaAnterior}
                disabled={paginaAtual === 1}
                className="btn-paginacao"
                >
                ⬅ Anterior
                </button>

                <span className="status-paginacao">
                Página {paginaAtual} de {totalPaginas}
                </span>

                <button
                onClick={onPaginaProxima}
                disabled={paginaAtual === totalPaginas}
                className="btn-paginacao"
                >
                Próxima ➡
                </button>
            </div>
        </div>
    );
}