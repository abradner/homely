class Capability < ActiveRecord::Base

  belongs_to :device

  validates_uniqueness_of :name, scope: :device_id
  validates_presence_of :name, :device_id, :capability_type

end
