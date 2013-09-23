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

#define OFF LOW
#define ON HIGH
#define DARK 5

// #define INPUT_LENGTH 4
// #define NUM_COLOURS 3

const int redPin   = 3; // the pin that the LED is attached to
const int greenPin = 5; // the pin that the LED is attached to
const int bluePin  = 6; // the pin that the LED is attached to

int iteration = 0;

//byte incomingBytes[INPUT_LENGTH];
//byte rgbBrightness[NUM_COLOURS];

void setup() {
  // initialize serial communication:
  Serial.begin(115200);
  // initialize the LED pin as an output:
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  welcome();
}

void loop() {
  // look for the next valid integer in the incoming serial stream:
  byte red = Serial.parseInt(); 
  // do it again:
  byte green = Serial.parseInt(); 
  // do it again:
  byte blue = Serial.parseInt(); 

  // look for the newline. That's the end of your
  // sentence:
  if (Serial.read() == '\n') {
    // constrain the values to 0 - 255
    red = constrain(red, 0, 255);
    green = constrain(green, 0, 255);
    blue = constrain(blue, 0, 255);

    // fade the red, green, and blue legs of the LED: 
    Serial.print("Setting Colours - ");
    Serial.println(iteration);
    Serial.println(red);
    Serial.println(green);
    Serial.println(blue);

    analogWrite(redPin, red);
    analogWrite(greenPin, green);
    analogWrite(bluePin, blue);

    iteration++;
  }
}

void welcome() {  
  analogWrite(greenPin, DARK);
  analogWrite(bluePin, DARK);
  analogWrite(redPin, DARK);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
    Serial.println("\nReady.");

}

//
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
