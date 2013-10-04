class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :name
      t.string :type
      t.string :interface
      t.string :address

      t.timestamps
    end
  end
end
