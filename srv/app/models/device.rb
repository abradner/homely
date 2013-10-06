class Device < ActiveRecord::Base

  has_many :capabilities

  validates_uniqueness_of :name, :address
  validates_presence_of :name, :device_type, :interface

end
