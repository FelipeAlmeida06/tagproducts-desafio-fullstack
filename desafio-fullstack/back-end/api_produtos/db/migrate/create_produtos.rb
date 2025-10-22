# 1. Criar o projeto Rails (API only):
#    rails new produtos_api --api --database=postgresql
#
# 2. Criar o model Produto:
#    rails generate model Produto nome:string preco:decimal descricao:text imagem:string
#
# 3. Editar a migration criada em db/migrate/*_create_produtos.rb
# 4. Rodar: rails db:create 
#           rails db:migrate
#
# 5. Criar o controller:
#    rails generate controller Api::V1::Produtos
# 6. Instalar Activate Storage:
#    rails active_storage:install
#    rails db:migrate
# 7. Testar a API no back-end
#    rails s

class CreateProdutos < ActiveRecord::Migration[7.0]
    def change
        create_table :produtos do |t|
            t.string :nome, null: false
            t.decimal :preco, precision: 10, scale: 2, null: false
            t.text :descricao, null: false

            t.timestamps
        end

        add_index :produtos, :nome
    end
end
