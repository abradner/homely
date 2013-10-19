class PagesController < ApplicationController
  require 'colour_obj'

  skip_before_filter :verify_authenticity_token, :only => :colour

  @state =[]
  @brightness_state = ""
  @colour_state =""
  @ping_state ="Device not there :("
  @@colour = "000000"


  before_action :instantiate_device

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
    col = @@colour
    fade("000000", @num_steps)
    @@colour = col
    display_page(notice: "Success!")
  end

  def on
    fade(@@colour, @num_steps)
    display_page(notice: "success!")
  end

  def white
    set_colour "ffffff", true
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
      fade(new_colours, @num_steps)
      display_page(notice: "success!")
    elsif colour.eql? "0"
      off
    elsif colour.eql? "1"
      on
    else
      
      display_page error: "Bad colour!"
    end

  end

  def query
    id = params[:id]
    display_state(id)
  end


  def ping
    message = "p"
    @device.send!(message)
    to_receive = nil
    t1 = Time.now
    while to_receive.nil? and (Time.now - t1) < 2
      to_receive = @device.receive!
    end
    if to_receive.nil?
      @ping_state = "Device not there :("
    elsif to_receive.chomp == "p"
      @ping_state = "Responded in " + (Time.now - t1).to_s + " seconds hurrah! :D"
    else
      @ping_state = "Bad response"
    end

    display_page
  end

  private
  def instantiate_device
    @device = Device.first
    @num_steps = 20
  end

  def get_state(id)


    state = []

    # TODO figure out how to get a list of all LEDs
    ledIDs = ["0", "1"]
    if not id.nil?
      ledIDs = [id]
    end

    ledIDs.each { |ledID|
      message = "?" + ledID
      @device.send! message


      # TODO make sure this doesn't inf loop with some kind of timeout

      to_receive = nil
      while to_receive.nil?
        to_receive = @device.receive!
      end

      state << to_receive.chomp
    }

    return state
  end

  def set_colour(colour, store)

    if do_colour_change(colour, store)
      display_page(notice: "success!")
    else
      display_page(error: "Device '#{@device.name}' is not connected.")
    end

  end

  def do_colour_change(colour, store)

    return false unless @device.connected?

    message = "(0" + colour + ")"
    printf("Message = %s\n", message)

    @device.send! message
    if store
      @@colour = colour
    end
    @state = []

    #SendDataWorker.perform_async(colour)

    true

  end


  def fade(colour, num_steps)

    return false unless @device.connected?

    steps = [255,num_steps].min

    old_colour = ColourObj::Colour.new @@colour
    new_colour = ColourObj::Colour.new(colour)

    @@colour = colour


    #TODO - if the value of each step works out to be less than one it will never fade
    # The [1,stuff].max hack will overshoot in these cases and needs to be fixed

     red_step   = (new_colour.red   - old_colour.red) / steps
     green_step = (new_colour.green - old_colour.green) / steps
     blue_step   =(new_colour.blue - old_colour.blue) / steps


    steps.times do |i|
      old_colour.shift red: red_step, green: green_step, blue: blue_step
      sleep 0.02

      do_colour_change(old_colour.to_s, false)
    end

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

  def display_page(flash_hash = {})
    display_state("0") if flash_hash[:error].blank?
    flash.now[:error] = flash_hash[:error]
    flash.now[:notice] = flash_hash[:notice]
    render(action: :basic_commands)
  end


end
