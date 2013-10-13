class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.integer :capability_id
      t.boolean :power
      t.string :mode

      t.timestamps
    end
  end
end
