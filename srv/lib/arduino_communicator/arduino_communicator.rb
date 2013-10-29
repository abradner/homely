# See homely/ard/doc/Protocol.md

require "serialport"


class ArduinoCommunicator

  attr_accessor :rate
  attr_accessor :port

  MESSAGE_START = 0xFF
  @message_modes = {
      system:   0x00,
  }

  @device = nil

  #include('protocols/p9813')
  #include('protocols/infra_red')

  def self.open(*args)
    o = new(*args)
    yield o
    o.close
  end

  def initialize; end

  def connect(address)
      raise "Cannot connect a stub arduino"
  end

  def connected?
    !@device.nil?
  end

  def send!(message)
    #message = 0xFF0101FFFFAABBCC
    @device.write(message) unless @device.nil?

  end

  def receive!()
    #message = 0xFF0101FFFFAABBCC

    @device.gets unless @device.nil?

  end


  def close
    @device.close unless @device.nil?
    @device = nil
  end


end




#port_str = "/dev/tty.usbserial-A5002rO5"  #may be different for you


#  Thread.new {
#    while true do
#      STDOUT.printf("%c", sp.getc)
#    end
#  }

#  while (l = STDIN.gets) do
#    sp.write(l.sub("\n", "\r"))
#  end

#open("/dev/tty", "r+") { |tty|
#  tty.sync = true
#  Thread.new {
#    while true do
#      tty.printf("%c", sp.getc)
#    end
#  }
#  while (l = tty.gets) do
#    sp.write(l.sub("\n", "\r"))
#  end
#}
#
#
#sp.close
