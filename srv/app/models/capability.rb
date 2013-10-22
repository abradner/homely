class Capability < ActiveRecord::Base

  VALID_TYPES = %w( P9813 )
  
  ON = 1
  OFF = 0
  
  #Setting names
  POWER = "Power"
  COLOUR = "Colour"
  PREFIX = "Prefix"
  STATUS = "Status"
  
  belongs_to :device
  has_many :settings

  validates_uniqueness_of :name, scope: :device_id
  validates_presence_of :name, :device_id, :capability_type, :prefix
  validates_inclusion_of :capability_type, in: VALID_TYPES

  alias_attribute :last_message, :message

  def self.valid_types
    VALID_TYPES
  end

  after_update :update_device

  ###############
  # Abstraction methods
  ###############

  def power
    p9813_power if self.capability_type.eql? "P9813"

  end

  def state
    p9813_colour if self.capability_type.eql? "P9813"
  end

  def status
    p9813_status if self.capability_type.eql? "P9813"
  end



  ###############
  # P9813 methods
  ###############

  def p9813_colour
    p9813_check!
    col = setting(COLOUR).value
    col
  end

  def p9813_colour=(val)
    p9813_check!

    colour = setting COLOUR
    colour.value = ColourObj::Colour.new(val).to_s # Until there is a Colour#validate/validate! method
    colour.save!

    p9813_message colour.value
    save!
  end

  def p9813_on
    p9813_check!
    power_change(ON)
    colour = setting COLOUR
    p9813_message colour.value
    save!
  end

  def p9813_off
    p9813_check!
    power_change(OFF)
    p9813_message "000000"
    save!
  end

  def p9813_power
    p9813_check!
    setting(POWER).value.to_i
  end

  def p9813_power_toggle
    p9813_check!
    power = setting(POWER).value.to_i
    if power.eql? OFF
      p9813_on
    else
      p9813_off
    end
  end

  def p9813_message(msg)
    p9813_check!
    self.message = "(#{prefix}#{msg})"
  end

  def p9813_ping
    p9813_check!
    self.device.send! "p"
    to_receive = nil
    message=""
    t1 = Time.now
    while to_receive.nil? and (Time.now - t1) < 2
      to_receive = self.device.receive!
    end
    if to_receive.nil?
      message = "Device not there :("
    elsif to_receive.chomp == "p"
      message = "Responded in " + (Time.now - t1).to_s + " seconds hurrah! :D"
    else
      message = "Bad response"
    end
    print (message + " = " + to_receive)
    stat = setting STATUS
    stat.value = message
    stat.save!
  end


  def p9813_status
    p9813_check!
    setting(STATUS).value
  end



  private


  ###############
  # Utility methods
  ###############


  def update_device
    self.device.send! last_message
  end

  def setting(name)
    rec = self.settings.where(name: name).first
    if rec.nil?
      rec = Setting.create(capability_id: self.id, name: name, value: "", min: 0, max: 0)
    end
    rec
  end

  def power_change(state)

    power = setting POWER
    power.value = state
    power.save!

  end


  ###############
  # Check methods
  ###############

  def p9813_check!
    raise TypeError, "Running P9813 commands on a non-P9813 capability." unless self.capability_type.eql? "P9813"
  end



end
