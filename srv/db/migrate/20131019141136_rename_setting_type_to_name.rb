class RenameSettingTypeToName < ActiveRecord::Migration
  def change
    rename_column :settings, :type, :name
  end
end
