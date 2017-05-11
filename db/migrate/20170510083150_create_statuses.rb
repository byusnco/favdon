class CreateStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :statuses do |t|
      t.integer :user_id, null: false
      t.string :uri, null: false
      t.string :url
      t.text :content
      t.integer :favourites_count
      t.integer :reblogs_count

      t.timestamps
    end
  end
end
