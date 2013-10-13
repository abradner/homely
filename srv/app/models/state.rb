class State < ActiveRecord::Base

  belongs_to :capability

  validates_inclusion_of :power, in: [true,false]

end
