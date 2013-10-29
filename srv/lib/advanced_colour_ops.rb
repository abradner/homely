class AdvancedColourOps
  require 'colour_obj'


  @colour = "000000"

  NUM_STEPS = 20

  def darker
    rgb = to_rgb(@colour)
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
    rgb = to_rgb(@colour)
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




  private


  def fade(colour, num_steps)

    return false unless @device.connected?

    steps = [255, num_steps].min

    old_colour = ColourObj::Colour.new @colour
    new_colour = ColourObj::Colour.new(colour)

    @colour = colour


    #TODO - if the value of each step works out to be less than one it will never fade
    # The [1,stuff].max hack will overshoot in these cases and needs to be fixed

    red_step = (new_colour.red - old_colour.red) / steps
    green_step = (new_colour.green - old_colour.green) / steps
    blue_step =(new_colour.blue - old_colour.blue) / steps


    steps.times do |i|
      old_colour.shift red: red_step, green: green_step, blue: blue_step
      sleep 0.02

      do_colour_change(old_colour.to_s, false)
    end

  end


end
