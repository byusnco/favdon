class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :instance
      t.text :note
      t.string :url
      t.text :avatar
      t.integer :statuses_count

      t.timestamps
    end
  end
end
