class CreateTableRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name
    end

    add_column :capabilities, :room_id, :integer
    add_column :settings, :room_id, :integer

  end
end
