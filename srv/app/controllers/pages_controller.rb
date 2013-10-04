class PagesController < ApplicationController
  @colour
  def home
  end

  def red
    set_colour "900"
  end

  def green
    set_colour "090"
  end

  def blue
    set_colour "009"
  end

  def off
    set_colour "000"
  end

  def on
    set_colour @colour
  end

  def white
    set_colour "999"
  end

  def darker
    colours = @colour.bytes
    colours.map! do |col|
      col = col > 0 ? col-1 : 0
    end

    set_colour(colours.join)
  end

 def lighter
    colours = @colour.bytes
    colours.map! do |col|
      col = col < 9 ? col+1 : 9
    end

    set_colour(colours.join)
  end



  def set_colour(colour)

    require './lib/arduino_communicator/arduino_communicator'
    require './lib/arduino_communicator/serial_arduino_communicator'
    require './lib/arduino_communicator/tcp_arduino_communicator'
    ard1 = TCPArduinoCommunicator.new
    ard2 = SerialArduinoCommunicator.new

    message = "(0" + colour + ")"

    ard1.send! message
    ard2.send! message

    @colour = colour

    ard1.close
    ard2.close
    render(:'pages/basic_commands')

  end
end
