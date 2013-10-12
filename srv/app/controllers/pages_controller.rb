class PagesController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :colour
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
      v -= 10
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
      v += 10
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

  private


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
    #ard1.close
    ard2.close
    render(:'pages/basic_commands')

  end
end
