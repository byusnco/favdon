class AddStatusCreatedAtToStatuses < ActiveRecord::Migration[5.1]
  def change
    add_column :statuses, :status_created_at, :datetime
  end
end
