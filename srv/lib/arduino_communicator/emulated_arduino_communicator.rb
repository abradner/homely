require 'colour_obj'
require 'socket'

class EmulatedArduinoCommunicator < ArduinoCommunicator

  NUM_LEDS = 10
  COLOUR_MESSAGE_LENGTH = 9
  QUERY_MESSAGE_LENGTH = 2
  RECV_LENGTH = 20


  def initialize
    @colours = []
    NUM_LEDS.times do |i|
      @colours[i] = ColourObj::Colour.new
    end

    @arduino_buffer = nil
    super
  end

  def connect(address)

    @device, @arduino_buffer = UNIXSocket.pair


    @listening = true
  end

  def send!(message)
    if connected?
      super
      if message == "ignore"
        @listening = false
      end
      if message == "listen"
        @listening = true
      end
      if @listening
        fulfill_request(@arduino_buffer.recv(RECV_LENGTH))
      end
    end
  end

  def fulfill_request(message)
    #Emulate Arduino code here

    command = message[0]

    ###### Colour command
    if command.eql? '('
      raise ArgumentError, "colour string '#{message}' was wrong length" unless message.length.eql? COLOUR_MESSAGE_LENGTH

      led = parse_led(message)

      colour = message[2,6]

      @colours[led].set_colour colour # will raise excepton if the colour is malformatted

      #send_status! led

    ###### Query Command
    elsif command.eql? '?'
      raise ArgumentError, "command string '#{message}' was wrong length" unless message.length.eql? QUERY_MESSAGE_LENGTH

      led = parse_led(message)
      send_status! led

    ###### Ping Command
    elsif command.eql? 'p'
      @arduino_buffer.write 'p'
    end

  end

  def receive!()
    if connected?
      str = @device.recv_nonblock(RECV_LENGTH)
      if str.nil? || str == ""
        str = nil
      end
      str
    else
      nil
    end
  end


  def close
    super
    @arduino_buffer.close unless @arduino_buffer.nil?
    @arduino_buffer = nil
  end

private
  def parse_led(message)
    led = message[1].to_i
    raise ArgumentError, "LED to query not specified" unless (message[1].eql? "0") ^ ((1..9).include? led)
    led
  end

  def send_status!(led)
    reply = "(#{led}#{@colours[led].to_s})"
    puts "Arduino Says: #{reply}"
    @arduino_buffer.write reply
  end
end
