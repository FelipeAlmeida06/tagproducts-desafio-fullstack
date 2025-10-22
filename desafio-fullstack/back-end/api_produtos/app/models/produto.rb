=begin
class Produto < ApplicationRecord
    has_one_attached :imagem

    # Validações de Nome (3-50 caracteres, campo obrigatório)
    validates :nome, presence: {message: "do produto é obrigatório"}
    validates :nome, length: {
        minimum: 3,
        message: "do produto deve ter mínimo de 3 caracteres"
    }, if: -> {nome.present?}
    validates :nome, length: {
        maximum: 50,
        message: "do produto deve ter máximo de 50 caracteres"
    }, if: -> {nome.present?}

    # Validação de Preço (mínimo de R$ 10,00, campo obrigatório)
    validates :preco, presence: {message: "do produto é obrigatório"}
    validates :preco, numericality: {
        greater_than_or_equal_to: 10,
        message: "do produto mínimo é de R$ 10,00"
    }, if: -> {preco.present?}

    # Validação de Descrição (30-255 caracteres, campo obrigatório)
    validates :descricao, presence: {message: "do produto é obrigatória"}
    validates :descricao, length: {
        minimum: 30,
        message: "do produto deve ter no mínimo 30 caracteres"
    }, if: -> {descricao.present?}
    validates :descricao, length: {
        maximum: 255,
        message: "do produto deve ter no máximo 255 caracteres"
    }, if: -> {descricao.present?}

    # Validação de Imagem (tipos aceitos PNG/JPG, máximo de 2MB, campo opcional)
    validates :imagem, content_type: {
        in: ['image/png', 'image/jpeg'],
        message: "do produto: apenas PNG ou JPG são aceitos"
    }, if: -> {imagem.attached?}

    validates :imagem, size: {
        less_than: 2.megabytes,
        message: "do produto não pode ultrapassar 2MB"
    }, if: -> {imagem.attached?}
end
=end


class Produto < ApplicationRecord
    has_one_attached :imagem
  
    validates :nome, presence: true, length: { minimum: 3, maximum: 50 }
    validates :preco, presence: true, numericality: { greater_than_or_equal_to: 10 }
    validates :descricao, presence: true, length: { minimum: 30, maximum: 255 }
    
    validates :imagem, content_type: {
      in: ['image/png', 'image/jpeg'],
      message: 'deve ser PNG ou JPEG'
    }, size: {
      less_than: 5.megabytes,
      message: 'deve ser menor que 5MB'
    }, if: -> { imagem.attached? }
  end