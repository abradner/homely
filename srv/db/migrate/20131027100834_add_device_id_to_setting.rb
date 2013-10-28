class AddDeviceIdToSetting < ActiveRecord::Migration
  def change
    add_column :settings, :device_id, :integer
  end
end
