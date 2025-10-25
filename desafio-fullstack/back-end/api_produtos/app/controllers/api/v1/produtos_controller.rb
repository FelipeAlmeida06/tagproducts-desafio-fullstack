module Api
    module V1
      class ProdutosController < ApplicationController
        before_action :set_produto, only: [:show, :destroy]
        before_action :simulate_delay      # delay
  
        # GET /api/v1/produtos
        def index
          @produtos = Produto.all.order(id: :asc)  # ordena por ID crescente
          render json: @produtos.map { |produto| produto_response(produto) }
        end
  
        # GET /api/v1/produtos/1
        def show
          render json: produto_response(@produto)
        end
  
        # POST /api/v1/produtos
        def create
          @produto = Produto.new(produto_params)
  
          if @produto.save
            # Anexar imagem se fornecida
            if params[:imagem]
              @produto.imagem.attach(params[:imagem])
            end
  
            render json: {
              mensagem: "Produto criado com sucesso",
              produto: produto_response(@produto)
            }, status: :created
          else
            render json: {
              erro: "Não foi possível criar o produto",
              erros: format_errors(@produto.errors)
            }, status: :unprocessable_entity
          end
        rescue ActionController::ParameterMissing => e
          render json: {
            erro: "Parâmetros inválidos",
            detalhes: [e.message]
          }, status: :bad_request
        end
  
        private

        # Delay
        def simulate_delay
          sleep 3    # Delay de 3 segundos
        end 
  
        def set_produto
          @produto = Produto.find(params[:id])
        rescue ActiveRecord::RecordNotFound
          render json: { erro: "Produto não encontrado" }, status: :not_found
        end
  
        def produto_params
          params.permit(:nome, :preco, :descricao, :imagem)
        end
  
        def produto_response(produto)
          response = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco.to_f,  # retorna como number
            imagem: produto.imagem.attached? ? url_for(produto.imagem) : nil,  # string ou null
            descricao: produto.descricao
          }
  
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
          errors.full_messages
        end

      end
    end
  end