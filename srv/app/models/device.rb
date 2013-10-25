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

  def ping?
    if perform_ping?
      true
    else
      @@dev_list[id].close
      false
    end
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
    print (message + " = " + to_receive)
    !to_receive.nil? && to_receive.chomp == "p"

  rescue Exception => e
    print "Raised " + e.message
    false
  end

end
