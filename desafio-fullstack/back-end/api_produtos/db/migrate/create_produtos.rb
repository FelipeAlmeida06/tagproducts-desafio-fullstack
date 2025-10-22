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
