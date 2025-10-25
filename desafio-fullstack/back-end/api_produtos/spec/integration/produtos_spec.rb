# Swagger
# Para gerar documentação:
#   rake rswag:specs:swaggerize

require 'swagger_helper'

RSpec.describe 'API Produtos', type: :request do
    path '/api/v1/produtos' do
        get 'Lista todos os produtos' do
            tags 'Produtos'
            produces 'application/json'
            parameter name: 'X-API-KEY', in: :header, type: :string, required: true

            response '200', 'produtos encontrados' do
                schema type: :array,
                    items: {
                        type: :object,
                        properties: {
                        id: { type: :integer },
                        nome: { type: :string },
                        preco: { type: :number },
                        imagem: { type: :string, nullable: true },
                        descricao: { type: :string }
                        }
                    }
                run_test!
            end

            response '401', 'não autorizado' do
                run_test!
            end
        end


        post 'Cria um produto' do
            tags 'Produtos'
            consumes 'multipart/form-data'
            produces 'application/json'
            parameter name: 'X-API-KEY', in: :header, type: :string, required: true
            parameter name: :produto, in: :body, schema: {
                type: :object,
                properties: {
                  nome: { type: :string },
                  preco: { type: :number },
                  descricao: { type: :string },
                  imagem: { type: :string, format: :binary }
                },
                required: ['nome', 'preco', 'descricao']
            }

            response '201', 'produto criado' do
                run_test!
            end

            response '422',  'erro de validação' do
                run_test!
            end
        end
    end
end