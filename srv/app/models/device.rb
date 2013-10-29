require 'yaml'

class Device < ActiveRecord::Base

  VALID_TYPES = %w( Arduino )
  VALID_INTERFACES = %w( Serial TCP Emulated )


  has_many :capabilities, dependent: :destroy

  validates_uniqueness_of :name, :address
  validates_presence_of :name, :device_type, :interface
  validates_inclusion_of :device_type, in: VALID_TYPES
  validates_inclusion_of :interface, in: VALID_INTERFACES

  after_create :add_default_capabilities

  def self.valid_types
    VALID_TYPES
  end

  def self.valid_interfaces
    VALID_INTERFACES
  end

  def connect

    #TODO: ADD MORE LATER
    #TODO: edit flash[:notice] for DevicesController#connect
    if interface == "Emulated"
      connection = EmulatedArduinoCommunicator.new
      connection.connect(address)
      @@dev_list[id] = connection
    end
  end

  def connected?
    !@@dev_list[id].nil? && @@dev_list[id].connected?
  end

  def connection
    @@dev_list[id]
  end

  def send!(message)
    @@dev_list[id].send!(message) unless @@dev_list[id].nil?
  end

  def receive!
    @@dev_list[id].receive!
  end

  def close
    @@dev_list[id].close unless @@dev_list[id].nil?
  end

  def ping?
    if perform_ping?
      true
    else
      @@dev_list[id].close
      false
    end
  rescue Exception => e
    false
  end

  private

  def perform_ping?
    send! "p"
    to_receive = nil
    message=""
    t1 = Time.now
    while to_receive.nil? and (Time.now - t1) < 2
      to_receive = receive!
    end
    if to_receive.nil?
      message = "Device not there :("
    elsif to_receive.chomp == "p"
      message = "Responded in " + (Time.now - t1).to_s + " seconds hurrah! :D"
    else
      message = "Bad response"
    end
    #print (message + " = " + to_receive)
    !to_receive.nil? && to_receive.chomp == "p"

  rescue Exception => e
    #print "Raised " + e.message
    false
  end

  def add_default_capabilities

    defaults_file = File.join(Rails.root, DEFAULTS_LOCATION, DEFAULT_CAPS_AND_SETTINGS_FILE)
    defaults = YAML::load_file(defaults_file)

    capabilities = defaults.delete "capabilities"

      capabilities.map! do |cap|
        room_name = cap.delete "room_name"
        room = Room.find_by_name room_name
        raise "Error - Capability '#{cap['name']}' has an invalid Room Name '#{room_name}' (does NOT match any rooms)" if room.nil?
        cap["room_id"] = room.id
        cap["device_id"] = self.id
        cap
      end

      Capability.create capabilities

  end

end

