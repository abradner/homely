module DevicesHelper
  RED_FACTOR = 0.299
  BLUE_FACTOR = 0.587
  GREEN_FACTOR = 0.114

  BRIGHTNESS_THRESHHOLD = 192
  WHITE = "ffffff"
  BLACK = "000000"

  def background_colour(fg)
    r, g, b = [fg[0, 2], fg[2, 2], fg[4, 2]].map { |col| col.to_i(16) }

    perceived_brightness = r*RED_FACTOR + g*GREEN_FACTOR + b*BLUE_FACTOR

    background_colour = perceived_brightness >= BRIGHTNESS_THRESHHOLD ? BLACK : WHITE

    background_colour
  end


  def str_arr_for_select(arr)
    arr.map { |el| [el,el] }
  end

  def str_arr_to_options_for_select(arr, default = nil)
    options_for_select str_arr_for_select(arr), default
  end

end
