# Homely Serial Protocol v0.1
2013-10-03

## Overview

Each command will start with a single byte FF
The next byte will define which mode it is using.

<pre>
| Code | Mode              |
|  00  | System Functions  |
|  01  | P9813 LED Control |
|  02  | IR Control        |
</pre>

the remaining bytes in the stream are purpose-specific

```eg: FF0101FFFFAABBCC```

<pre>
| Byte  | Content | Command             |
| 00    | FF      | (Incoming Command)  |
| 01    | 01      | LED Control         |
| 02    | 01      | Set Colour (RGB)    |
| 03    | FFFF    | Using ALL Leds      |
| 04    | AABBCC  | Colour #AABBCC      |
</pre>

## P9813 LED Control

### Modes

<pre>
| Code | Mode             							|
|  00  | Update Settings  							|
|  01  | Set Colour (RGB) 							|
|  02  | Set Colour (HSL) (currently unimplemented) |
</pre>

### Update Settings

Format: 3 bytes long

<pre>
| Byte  | Function         |
|   0   | Key              |
|   1   | Value MSB        |
|   2   | Value LSB        |
</pre>

<pre>
| Key ID | Key Name         | Arduino var/function()     | Values      |
| 0      | Number of LEDS   | SetLEDs(int n)             | 1..65,534   |
</pre>

### Set Colour (RGB)

Format: 5 bytes long. 

<pre>
| Byte  | Function         |
|   0   | LED Number (MSB) |
|   1   | LED Number (LSB) |
|   2   | Red Value 	   |
|   3   | Green Value      |
|   4   | Blue Value       |
</pre>

* Note: Using LED Number FFFF will set ALL Leds


## IR Control

* TODO
