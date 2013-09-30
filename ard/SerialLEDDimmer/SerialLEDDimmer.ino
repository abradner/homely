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


#define OFF LOW
#define ON HIGH
#define DARK 5
#define NUM_LEDS 10
#define ASCIIOFFSET 48

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

void loop() {
  if (Serial.available() > 0) {
    if (Serial.read() == '(') {
    int ledNo = Serial.read();
    // look for the next valid digit in the incoming serial stream:
    int red = Serial.read(); 
    // do it again:
    int green = Serial.read(); 
    // do it again:
    int blue = Serial.read(); 
  
    Serial.read(); // ')'
  
  
  
      Serial.println((char)ledNo);
      Serial.println((char)red);
      Serial.println((char)green);
      Serial.println((char)blue);
  
    //dodgy approximation is dodgy
    red = ( (red - ASCIIOFFSET) *85 ) / 3;
    green = ( (green - ASCIIOFFSET ) *85 ) /3;
    blue = ( (blue - ASCIIOFFSET ) *85 ) /3;
   
    ledNo = ledNo - ASCIIOFFSET;
      
      // fade the red, green, and blue legs of the LED: 
      Serial.print("Setting Colours - ");
      Serial.println(ledNo);
      Serial.println(red);
      Serial.println(green);
      Serial.println(blue);
    
    leds.setColorRGB(ledNo, red, green, blue);
    }
  }
}

void welcome() {  
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
