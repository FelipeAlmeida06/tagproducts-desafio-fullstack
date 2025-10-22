class Produto < ApplicationRecord
    validates :nome, presence: {message: "obrigatório"}
    validates :preco, presence: {message: "obrigatório"},
        numericality: {greater_than: 0, message: "deve ser maior que zero"}
    validates :descricao, presence: {message: "obrigatório"}

    validates :imagem, format: {
        with: URI::DEFAULT_PARSER.make_regexp(%w[http https]),
        message: "deve ser uma URL válida",
        allow_blank: true
    }
end
