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
                    }, status: :created
                else 
                    render json: {
                        erro: "Não foi possível criar o produto",
                        detalhes: format_errors(@produto.errors)
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
                    params.permit(:nome, :preco, :descricao, :imagem)
                end

                def produto_response(produto)
                    response = {
                        id: produto.id,
                        nome: produto.nome,
                        preco: format("%.2f", produto.preco),
                        descricao: produto.descricao,
                        imagem: produto.imagem,
                        criado_em: produto.created_at.iso8601,
                        atualizado_em: produto.updated_at.iso8601
                    }

                    # validações:
                    if produto.imagem.attached?
                        response[:imagem] = {
                            url: url_for(produto.imagem),
                            nome: produto.imagem.filename.to_s,
                            tamanho: produto.imagem.byte_size,
                            tipo: produto.imagem.content_type
                        }
                    else
                        response[:imagem] = nil
                    end

                    response
                end

                def format_errors(errors)
                    errors.full_messages.map do |message|
                        # remove prefixo "Imagem" das mensagens de validação
                        #message.gsub(/^Imagem /, '')
                    end
                end
            end
        end
    end
