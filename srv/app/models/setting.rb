class Setting < ActiveRecord::Base

  belongs_to :capability

  self.inheritance_column = nil

end
