class RecreateProdutosTable < ActiveRecord::Migration[7.0]
  def up
    # Remove a tabela se existir (com CASCADE para remover dependências)
    drop_table :produtos, if_exists: true, force: :cascade
    
    # Cria a tabela corretamente
    create_table :produtos do |t|
      t.string :nome, null: false
      t.decimal :preco, precision: 10, scale: 2, null: false
      t.text :descricao, null: false
      t.timestamps
    end
    
    add_index :produtos, :nome
  end

  def down
    drop_table :produtos, if_exists: true, force: :cascade
  end
end