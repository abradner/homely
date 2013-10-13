class Capability < ActiveRecord::Base

  VALID_TYPES = %w( P9813 )
  belongs_to :device
  has_many :states

  validates_uniqueness_of :name, scope: :device_id
  validates_presence_of :name, :device_id, :capability_type
  validates_inclusion_of :capability_type, in: VALID_TYPES


  def self.valid_types
    VALID_TYPES
  end

end
