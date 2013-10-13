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
ChainableLED leds(7, 8, NUM_LEDS);//defines the pin used on arduino.

void setup() {
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  
  //Defines the num of LEDs used, The undefined 
  //will be lost control.

  welcome();
}

int read_hex() {
  int a = Serial.read();
  int b = Serial.read();
  if (a >= 'a') {
    a = a - 'a' + 10;
  } else {
    a -= '0';
  }
  if (b >= 'a') {
    b = b - 'a' + 10;
  } else {
    b -= '0';
  }
  return a * 16 + b;
}

void print_hex(int v) {
  int a = v / 16;
  int b = v % 16;
  if (a < 10) {
    Serial.print(a + '0');
  } else {
    Serial.print(a - 10 + 'a');
  }
  if (b < 10) {
    Serial.print(b + '0');
  } else {
    Serial.print(b - 10 + 'a');
  }
}

void loop() {
  if (Serial.available() > 1) {    
    if (Serial.peek() == '(') {
      if (Serial.available() <= 4) {
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
      Serial.print("Setting Colours - ");
      Serial.println(ledNo);
      Serial.println(red);
      Serial.println(green);
      Serial.println(blue);
    
      leds.setColorRGB(ledNo, red, green, blue);
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
      // TODO send the state
      Serial.print("(");
      Serial.print(ledNo);
      print_hex(red);
      print_hex(green);
      print_hex(blue);
      Serial.println(")");
    } else {
      // Invalid data, gobble hoping that it was a typo
      Serial.read();
    }
  }
}

void welcome() {  
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

  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
    Serial.println("\nReady.");

}

//void thing(byte* red, byte* green, byte* blue) {
//    int inChar;
//
//  // Read serial input:
//  if (Serial.available() > 0) {
//    inChar = Serial.read();
//  }
//
//  if (isDigit(inChar)) {
//    // convert the incoming byte to a char 
//    // and add it to the string:
//    inString += (char)inChar; 
//  }
//
//  // if you get a comma, convert to a number,
//  // set the appropriate color, and increment
//  // the color counter:
//  if (inChar == ',') {
//    // do something different for each value of currentColor:
//    switch (currentColor) {
//    case 0:    // 0 = red
//      *red = inString.toInt();
//      // clear the string for new input:
//      inString = ""; 
//      break;
//    case 1:    // 1 = green:
//      *green = inString.toInt();
//      // clear the string for new input:
//      inString = ""; 
//      break;
//    }
//    currentColor++;
//  }
//  // if you get a newline, you know you've got
//  // the last color, i.e. blue:
//  if (inChar == '\n') {
//    *blue = inString.toInt();
// 
// }
