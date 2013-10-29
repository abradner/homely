def seed_devices!
#Devices
  Device.delete_all
  @config["devices"].each do |dev|
    Device.create!(dev)
  end
end

def seed_rooms!
#Rooms
  Room.delete_all
  @config["rooms"].each do |room|
    Room.create!(room)
  end
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
      cap["device_id"] = dev.id
      cap
    end

    rescue Exception => e
      puts "Error - Capability '#{e.message}' has an invalid 'Device Name' (does NOT match any devices)"
      exit 1
  end

  begin

    capabilities.map! do |cap|
      room_name = cap.delete "room_name"
      room = Room.find_by_name room_name
      raise cap["name"] if room.nil?
      cap["room_id"] = room.id

      cap
    end

  rescue Exception => e
    puts "Error - Capability '#{e.message}' has an invalid 'Room Name' (does NOT match any rooms)"
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
      parent = parent_klass.where(name: parent_name).first


      if parent.nil?
        raise ArgumentError, "Error: Could not find parent #{parent_name} for #{item["name"]}. Parent Contents:\n #{parent_klass.all.all.inspect}\n "
      end
      item[parent_klass_name + "_id"] = parent.id
      item
    end

  rescue ArgumentError => e
  puts e.message
    exit 1
  end

  has_many_collection.each do |element|
    child_klass.create! element
  end

end