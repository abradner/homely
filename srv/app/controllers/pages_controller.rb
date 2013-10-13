class PagesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :colour

  @state
  @@colour = "000000"
  def home
  end

  def red
    set_colour "ff0000", true
  end

  def green
    set_colour "00ff00", true
  end

  def blue
    set_colour "0000ff", true
  end

  def off
    set_colour "000000", false
  end

  def on
    set_colour @@colour, false
  end

  def white
    set_colour "ffffff", true
  end

  def to_rgb(colour)
    result = []
    result.append(colour.slice(0, 2).to_i(16))
    result.append(colour.slice(2, 2).to_i(16))
    result.append(colour.slice(4, 2).to_i(16))
    return result
  end

  def to_hex(rgb)
    res = ""
    rgb.each do |v|
      s = v.to_s(16)
      while s.length < 2 do
        s = "0" + s
      end
      res += s
    end
    return res
  end

  def darker
    rgb = to_rgb(@@colour)
    new_rgb = []
    rgb.each do |v|
      v -= 20
      if v < 0
        v = 0
      end
      new_rgb.append(v)
    end
    set_colour(to_hex(new_rgb), true)
  end



  def lighter
    rgb = to_rgb(@@colour)
    new_rgb = []
    rgb.each do |v|
      v += 20
      if v > 255
        v = 255
      end
      new_rgb.append(v)
    end
    set_colour(to_hex(new_rgb), true)
  end


  def colour
    colour = params[:colour]
    if colour =~ /(^\d{3}$)/
      colours = colour.chars
      new_colours=""
      colours.each do |c|
        v = (c.ord - '0'.ord)
        s = ((v * 255)/9).to_s(16)
        while s.length < 2 do
          s = "0" + s
        end
        new_colours += s
      end
      set_colour(new_colours, true)
    end
  end

  def query
    id = params[:id]
    display_state(id)
  end

  def set_colour(colour, store)

    require 'arduino_communicator/arduino_communicator'
    require 'arduino_communicator/serial_arduino_communicator'
    require 'arduino_communicator/tcp_arduino_communicator'
    #ard1 = TCPArduinoCommunicator.new
    ard2 = SerialArduinoCommunicator.new

    message = "(0" + colour + ")"
    printf("Message = %s\n", message)
    #ard1.send! message
    ard2.send! message
    if store
      @@colour = colour
    end
    @state = []

    #ard1.close
    ard2.close
    render(:'pages/basic_commands')
    SendDataWorker.perform_async(colour)

  end

  def display_state(id)

    require './lib/arduino_communicator/arduino_communicator'
    require './lib/arduino_communicator/serial_arduino_communicator'
    require './lib/arduino_communicator/tcp_arduino_communicator'
    #ard1 = TCPArduinoCommunicator.new
    ard2 = SerialArduinoCommunicator.new

    #@@colour = ""

    @state = []

    # TODO figure out how to get a list of all LEDs
    ledIDs = ["0", "1"]
    if not id.nil?
      ledIDs = [id]
    end

    ledIDs.each { |ledID|
      message = "?" + ledID
      #ard1.send! message
      ard2.send! message


      # TODO make sure this doesn't inf loop with some kind of timeout

      to_receive = nil
      while to_receive.nil?
        to_receive = ard2.receive!
      end

      @state << to_receive.chomp
      print @state
    }
    #ard1.close
    ard2.close
    print "Done!"
    render(:'pages/basic_commands')

  end

end
