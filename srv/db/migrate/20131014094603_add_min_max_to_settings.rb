class AddMinMaxToSettings < ActiveRecord::Migration
  def change
    add_column :settings, :min, :integer
    add_column :settings, :max, :integer
  end
end
