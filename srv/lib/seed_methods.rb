
def seed_devices!
#Devices
  Device.delete_all
  Device.create(@config["devices"])
end

def seed_capabilities!
#Capabilities
  Capability.delete_all
  capabilities = @config.delete "capabilities"


  begin

    capabilities.map! do |cap|
      dev_name = cap.delete "device_name"
      dev = Device.find_by_name dev_name

      raise cap["name"] if dev.nil?
      dev.inspect
      cap["device_id"] = dev.id

      cap
    end

  rescue Exception => e
    puts "Error - Capability '#{e.message}' has an invalid 'Device Name' (does NOT match any devices)"
    exit 1
  end

  Capability.create capabilities

end