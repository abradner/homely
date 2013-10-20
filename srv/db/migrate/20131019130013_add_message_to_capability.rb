class AddMessageToCapability < ActiveRecord::Migration
  def change
    add_column :capabilities, :message, :string
  end
end
