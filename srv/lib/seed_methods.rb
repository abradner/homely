
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

def seed_classes(parent_klass, child_klass)!
#Capabilities
  child_klass.delete_all
  has_many_collection = @config.delete child_klass.name.downcase.pluralize


  parent_klass_name = parent_klass.name.downcase

  begin

    has_many_collection.map! do |item|
      parent_name = item.delete (parent_klass_name + "_name")
      parent = parent_klass.find_by_name parent_name

      #raise item["name"] if dev.nil?
      parent.inspect
      item[parent_klass_name + "_id"] = parent.id

      item
    end

  #rescue Exception => e
  #  puts "Error - #{klass_has_many} '#{e.message}' has an invalid '#{klass_belongs_to}' (does NOT match any devices)"
  #  exit 1
  end

  child_klass.create has_many_collection

end