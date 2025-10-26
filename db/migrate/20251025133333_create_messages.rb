class CreateMessages < ActiveRecord::Migration[8.1]
  def change
    create_table :messages do |t|
      t.references :chatroom, null: false, foreign_key: true
      t.string :username
      t.text :content

      t.timestamps
    end
  end
end
