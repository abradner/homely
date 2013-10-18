class Device < ActiveRecord::Base

  VALID_TYPES = %w( Arduino )
  VALID_INTERFACES = %w( Serial TCP Emulated )

  has_many :capabilities

  validates_uniqueness_of :name, :address
  validates_presence_of :name, :device_type, :interface
  validates_inclusion_of :device_type, in: VALID_TYPES
  validates_inclusion_of :interface, in: VALID_INTERFACES

  def self.valid_types
    VALID_TYPES
  end

  def self.valid_interfaces
    VALID_INTERFACES
  end

  def connected?
    @@dev_list[id] && @@dev_list[id].connected?
  end

  def connection
    @@dev_list[id]
  end

  def send!(message)
    @@dev_list[id].send! message
  end

  def receive!
    @@dev_list[id].receive!
  end
end
