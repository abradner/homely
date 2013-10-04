
class SerialArduinoCommunicator < ArduinoCommunicator

  def initialize
    super

    leonardo0 = Dir.glob("/dev/tty.usbmodem*").first.to_s
    #port_str = "/dev/tty.usbserial-A5002rO5"
    port_str = "/dev/tty.usbserial-A5002rO5"
    #port_str = ARGV[0].to_s
    baud_rate = 9600
    data_bits = 8
    stop_bits = 1
    parity = SerialPort::NONE

    @device = SerialPort.new(leonardo0, baud_rate, data_bits, stop_bits, parity)


  end

  def send!(message)
    super
  end

end
