class Colour
  @red, @green, @blue = 0

  attr_accessor :red, :green, :blue


  def initialize (colour)
    @red, @green, @blue = colour if valid_triplet?(colour)
    set_hex colour if valid_hex?(colour)
  end


# Takes in a string of form RRGGBB where each character is 0..F
  def set_hex(hex_str)
    hex_str.upcase!

    if valid_hex? hex_str
      return parse_hex hex_str
    end
    false
  end

#returns an array of colours
  def to_rgb
    [@red, @green, @blue]
  end

  def to_s
    to_hex
  end

  def to_hex
    res = el_to_hex(@red) << el_to_hex(@green) << el_to_hex(@blue)
    res
  end

  private

  def el_to_hex(el)
    hx = el.to_s(16)
    if hx.length.eql? 1
      hx = "0" << hx
    end
    hx
  end


  def valid_triplet?(arr)
    return false unless arr.is_a? Array
    return false unless arr.length.eql?(3)
    arr.each do |el|
      return false unless el.is_a? Integer
    end
    true
  end


  def valid_hex?(str)
    return false unless str.is_a? String
    return false unless str.length.eql? 6
    return false unless (str.upcase =~ /^[A-F0-9]{6}$/).eql? 0
    true
  end

  def parse_hex(str)
    @red, @green, @blue = hex2rgb str
    true
  end

  def hex2rgb(str)
    r = str.slice(0, 2).to_i(16)
    g = str.slice(2, 2).to_i(16)
    b = str.slice(4, 2).to_i(16)

    return r, g, b
  end

end