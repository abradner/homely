class PagesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :colour
  @state
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


  def colour
    colour = params[:colour]
    set_colour(colour)
  end

  def query
    id = params[:id]
    display_state(id)
  end

private


  def set_colour(colour)

    require 'arduino_communicator/arduino_communicator'
    require 'arduino_communicator/serial_arduino_communicator'
    require 'arduino_communicator/tcp_arduino_communicator'
    #ard1 = TCPArduinoCommunicator.new
    ard2 = SerialArduinoCommunicator.new

    message = "(0" + colour + ")"

    #ard1.send! message
    ard2.send! message

    @colour = colour
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

    @colour = ""

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
    }

    #ard1.close
    ard2.close
    render(:'pages/basic_commands')

  end

end
