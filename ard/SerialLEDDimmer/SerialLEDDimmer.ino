/*
  Serial LED Dimmer
 
 Using the arduino board to set LED brightness based on data recieved over the serial port
 
 The circuit:
 * RGB LED connected from digital pin 3, 5 and 6 to ground
 
 created 2013
 by Alex Bradner
 based on code by Tom Igoe
 

This work is licensed under a Creative Commons 
Attribution-NonCommercial-ShareAlike 3.0 Unported License
http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US
*/

#include <ChainableLED.h>
#include "setup.h"


const int redPin   = 3; // the pin that the LED is attached to
const int greenPin = 5; // the pin that the LED is attached to
const int bluePin  = 6; // the pin that the LED is attached to

int iteration = 0;
ChainableLED leds(7, 8, NUM_LEDS, false);//defines the pin used on arduino.

void setup() {
  // initialize serial communication:
  Serial.begin(115200);
  // initialize the LED pin as an output:
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  
  //Defines the num of LEDs used, The undefined 
  //will be lost control.

  welcome();
}


void loop() {
  if (Serial.available() >= 1) {    
    if (Serial.peek() == '(') {
      if (Serial.available() <= 7) {
        return;
      }
      Serial.read();
      int ledNo = Serial.read();
      // look for the next valid digit in the incoming serial stream:
      int red = read_hex(); 
      // do it again:
      int green = read_hex();
      // do it again:
      int blue = read_hex(); 
  
      Serial.read(); // ')'
    
      ledNo = ledNo - '0';
      
      // fade the red, green, and blue legs of the LED: 
      leds.setColorRGB(ledNo, red, green, blue);

      //print_status(ledNo,red,green,blue);
    
    } else if (Serial.peek() == '?') {
      if (Serial.available() <= 1) {
        return;
      }
      Serial.read();
      byte ledNo = Serial.read();

      ledNo = ledNo - ASCIIOFFSET;

      byte red, green, blue;

      // TODO handle error
      leds.getLEDState(ledNo, &red, &green, &blue);      
      print_status(ledNo,red,green,blue);

    } else if (Serial.peek() == 'p') {
      Serial.read();
      Serial.println("p");
    } else {
      // Invalid data, gobble hoping that it was a typo
      Serial.read();
    }
  }
}

void welcome() { 
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
    LED_test_pattern();
    //Serial.println("\nReady.");

}
