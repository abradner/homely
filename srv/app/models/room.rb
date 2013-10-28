class Room < ActiveRecord::Base

  has_many :capabilities

  validates_presence_of :name

end
