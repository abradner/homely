
int interpolate_colour(int input) {
  // An approximation to convert 0..9 to 0..255 without decimals
  return ( (input - ASCIIOFFSET) *85 ) / 3;
}

int interpolate_byte(int colour) {
  // An approximation to convert 0..255 to 0..9 without decimals
  return ( (colour * 3) / 85 );
}

void LED_test_pattern() {
    for (int i = 0; i < NUM_LEDS; i++) {
    leds.setColorRGB(i, DARK, DARK, DARK);
  }
  for (int i = 0; i < NUM_LEDS; i++) {
    leds.setColorRGB(i, DARK, 255, DARK);
    delay(20);
  }
    for (int i = 0; i < NUM_LEDS; i++) {
    leds.setColorRGB(i, DARK, DARK, DARK);
  }
}
