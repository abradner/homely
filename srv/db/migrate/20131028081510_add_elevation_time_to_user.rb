class AddElevationTimeToUser < ActiveRecord::Migration
  def change
    add_column :users, :elevation_time, :datetime
  end
end
