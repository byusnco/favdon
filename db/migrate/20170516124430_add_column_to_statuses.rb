class AddColumnToStatuses < ActiveRecord::Migration[5.1]
  def change
    add_column :statuses, :spoiler_text, :text
    add_column :statuses, :sensitive, :boolean, default: false
  end
end
