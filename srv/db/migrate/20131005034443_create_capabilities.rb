class CreateCapabilities < ActiveRecord::Migration
  def change
    create_table :capabilities do |t|
      t.string :name
      t.integer :device_id
      t.string :capability_type
      t.string :state

      t.timestamps
    end
  end
end
