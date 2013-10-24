require './lib/arduino_communicator/arduino_communicator'
require './lib/arduino_communicator/emulated_arduino_communicator'
require './lib/arduino_communicator/serial_arduino_communicator'
require './lib/arduino_communicator/tcp_arduino_communicator'
require 'yaml'


DEVICE_PROTOCOL_MAP_FILE = "device_protocol.yml"

seed_file = File.join(Rails.root, 'config', DEVICE_PROTOCOL_MAP_FILE)
proto_map = YAML::load_file(seed_file)


#Create initialise communication for each device

@@dev_list = {}

registered_devices = Device.all


registered_devices.each do |dev|
  interface = proto_map[dev.interface]

  #Check to make sure its a valid interface
  raise "Cannot map interface '#{dev.interface}' to any protocol" if interface.blank?

  connection = Kernel.const_get(interface).new
  @@dev_list[dev.id] = connection

  #TODO: This should be safe because we only init once and from then on we check for nil then run methods
  # That said... I'm not sure.
  Thread.new do
    puts "Device [#{dev.id}](#{dev.name}) Connecting..."
    begin

    @@dev_list[dev.id].connect(dev.address)

    rescue Exception => e
      puts "Connection to [#{dev.id}](#{dev.name}) raised exception:"
      puts e.message
    end

    puts "Device [#{dev.id}](#{dev.name}) Connected."
  end

end

## CLOSE ALL OPEN HANDLES
at_exit do
  registered_devices = Device.where id: @@dev_list.keys
  registered_devices.each do | dev|

    dev_name = "[#{dev.id}](#{dev.name})"
    conn = @@dev_list.delete dev.id

    if conn.blank?
      puts "Warning: #{dev_name} was not open!"
    else
      puts "#{dev_name} Closing..."
      conn.close
      puts "#{dev_name} Closed."
    end
  end

  @@dev_list.each do |id, conn|
    puts "Warning: Deleted device [#{id}] still open, closing now."
    puts "[#{id}] Closing..."
    conn.close
    puts "[#{id}] Closed."
  end

end



