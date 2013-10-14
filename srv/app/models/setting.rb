class Setting < ActiveRecord::Base

  belongs_to :capability

  self.inheritance_column = nil

  validates_presence_of :type
  validates_presence_of :value

end
