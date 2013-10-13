
class SerialArduinoCommunicator < ArduinoCommunicator

  def initialize
    super

    # If your aduino isn't being recognised, add it to the list below
    # - as generic as possible to find all arduinos of that model
    # - as specific as necessary to not accidentally collect other devices
    arduino_list = [
        "/dev/tty.usbserial-A*", # Mac Pre-Uno
        "/dev/tty.usbmodem*", # Mac Post-Uno
        "/dev/ttyUSB*", # Ubuntu Pre-Uno
        "/dev/ttyACM*" # Ubuntu Post-Uno
    ]


    #Don't touch below!

    arduino_list.map! do |ard|
      ard = Dir.glob(ard)
    end

    arduino0 = arduino_list.flatten!.first.to_s
    raise "Error - No Arduinos Connected via Serial" if arduino0.empty?

    baud_rate = 9600
    data_bits = 8
    stop_bits = 1
    parity = SerialPort::NONE

    @device = SerialPort.new(arduino0, baud_rate, data_bits, stop_bits, parity)

  end

  def send!(message)
    super
  end

  def receive!()
    super
  end


end
