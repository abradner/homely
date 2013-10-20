class AddPrefixToCapability < ActiveRecord::Migration
  def change
    add_column :capabilities, :prefix, :integer
  end
end
