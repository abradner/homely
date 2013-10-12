class RemoveStateFromCapability < ActiveRecord::Migration
  def change
        remove_column :capabilities, :state
  end
end
