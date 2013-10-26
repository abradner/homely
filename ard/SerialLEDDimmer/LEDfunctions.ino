
int interpolate_colour(int input) {
  // An approximation to convert 0..9 to 0..255 without decimals
  return ( (input - ASCIIOFFSET) *85 ) / 3;
}

int interpolate_byte(int colour) {
  // An approximation to convert 0..255 to 0..9 without decimals
  return ( (colour * 3) / 85 );
}


void set_all_leds(int r, int g, int b, int wait=0) {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds.setColorRGB(i, r,g,b);
    delay(wait);
  }
} 

void LED_test_pattern() {
  set_all_leds(DARK, DARK, DARK);
  set_all_leds(DARK, BRIGHT, DARK, 20);
  set_all_leds(DARK, DARK, DARK);
}

byte waiting_pattern(byte counter) {
  byte red,green,blue = DARK;
  switch (counter){
    case 0:
      red = DARK;
      green = DARK;
      blue = DARK;
      counter++;              
      break;
    case 1:
      red = DARK+DARK;
      green = DARK;
      blue = DARK;
      counter++;              
      break;
    case 2:
      red = DARK;
      green = DARK+DARK;
      blue = DARK;
      counter++;              
      break;
    case 3:
      red = DARK;
      green = DARK;
      blue = DARK+DARK;
      counter = 0;              
      break;
    default:
      red, green, blue = DARK;
      counter = 0;
  }

  set_all_leds(red,green,blue);
  delay(10); 
  return counter;
}
