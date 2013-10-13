
int interpolate_colour(int input) {
  // An approximation to convert 0..9 to 0..255 without decimals
  return ( (input - ASCIIOFFSET) *85 ) / 3;
}

int interpolate_byte(int colour) {
  // An approximation to convert 0..255 to 0..9 without decimals
  return ( (colour * 3) / 85 );
}
