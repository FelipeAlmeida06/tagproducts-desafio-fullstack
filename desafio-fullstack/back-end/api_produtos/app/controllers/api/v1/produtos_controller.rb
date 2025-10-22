# Os campos deverão ser validados de acordo com os requisitos solicitados na etapa de Frontend:
# Os requisitos solicitados de Frontend estão no arquivo: Formulario.jsx nas linhas 123 até 163
# Seguir estes requisitos e alterar nesse arquivo

module Api
    module V1
        class ProdutosController < ApplicationRecord

            # ROTA POST /api/v1/produtos
            def create
                @produto = Produto.new(produto_params)

                if @produto.save
                    render json: {
                        mensagem: "Produto criado com sucesso",
                        produto: produto_response(@produto)
                    }, status: :created_at
                    else 
                        render json: {
                            erro: "Não foi possível criar o produto",
                            detalhes: @produto.errors.full_messages
                        }, status: :unprocessable_entity
                    end
                rescue ActionControler::ParameterMissing => e
                    render json: {
                        erro: "Parâmetros inválidos",
                        detalhes: [e.message]
                    }, status: :bad_request
                end

                private

                def produto_params
                    params.require(:produto).permit(:nome, :preco, :imagem, :descricao)
                end

                def produto_response(produto)
                    {
                        id: produto.id,
                        nome: produto.nome,
                        preco: format("%.2f", produto.preco),
                        imagem: produto.imagem,
                        descricao: produto.descricao,
                        criado_em: produto.created_at.iso8601,
                        atualizado_em: produto.updated_at.iso8601
                    }
                end
            end
        end
    end
