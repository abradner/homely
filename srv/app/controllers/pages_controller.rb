class PagesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :colour

  @state =[]
  @brightness_state = ""
  @colour_state =""
  @ping_state ="Device not there :("
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

  def ping()
    require './lib/arduino_communicator/arduino_communicator'
    require './lib/arduino_communicator/serial_arduino_communicator'
    require './lib/arduino_communicator/tcp_arduino_communicator'
    #ard1 = TCPArduinoCommunicator.new
    ard2 = SerialArduinoCommunicator.new
    message = "p"
    ard2.send! message
    to_receive = nil
    t1 = Time.now
    while to_receive.nil? and (Time.now - t1) < 2
      to_receive = ard2.receive!
    end
    if to_receive.nil?
      @ping_state = "Device not there :("
    elsif to_receive.chomp == "p"
      @ping_state = "Responded in " + (Time.now - t1).to_s + " seconds hurrah! :D"
    else
      @ping_state = "Bad response"
    end
    #ard1.close
    ard2.close

    display_page
  end

  def get_state(id)

    require './lib/arduino_communicator/arduino_communicator'
    require './lib/arduino_communicator/serial_arduino_communicator'
    require './lib/arduino_communicator/tcp_arduino_communicator'
    #ard1 = TCPArduinoCommunicator.new
    ard2 = SerialArduinoCommunicator.new
    state = []

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

      state << to_receive.chomp
    }
    #ard1.close
    ard2.close
    return state
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
    display_page
    SendDataWorker.perform_async(colour)

  end

  def display_state(id)
    @state = get_state(id)
    if @state.size > 0
      te = @state[0]
      te = te.slice(2, 6)
      if te.nil?
        return
      end
      rgb = to_rgb(te)
      size = 0
      rgb.each { |a| size+=(a**2) }
      if size == 0
        @brightness_state = "The light is off\n"
        @colour_state = ""
      else
        @brightness_state = "Brightness = " + (Math.sqrt(size / ((255.0 ** 2) * 3)) * 10).to_s
        @colour_state = "Colour = " + te
      end
    end
  end

  def display_page()
    display_state("0")
    render(:'pages/basic_commands')
  end

end
