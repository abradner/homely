class ConvertStatesToSettings < ActiveRecord::Migration
  def change

    change_table :states do |t|
      t.change :power, :integer
      t.rename :mode, :type
      t.rename :power, :value
    end

    rename_table :states, :settings

  end
end
