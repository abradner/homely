class State < ActiveRecord::Base

  belongs_to :capability

  validates_presence_of :power

end
