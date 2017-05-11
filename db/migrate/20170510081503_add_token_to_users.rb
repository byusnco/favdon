class AddTokenToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :token, :text
    add_column :users, :uid, :string
    add_column :users, :instance_account_id, :integer
  end
end
