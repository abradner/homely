int hex_to_i(byte digit) {
  if (digit >= 'a') {
    digit = digit - 'a' + 10;
  } else {
    digit -= '0';
  }
  return digit;
}

int read_hex() {
  int a = hex_to_i(Serial.read());
  int b = hex_to_i(Serial.read());

  return a * 16 + b;
}

void print_hex(int v) {
  int a = v / 16;
  int b = v % 16;
  if (a < 10) {
    Serial.write(a + '0');
  } else {
    Serial.write(a - 10 + 'a');
  }
  if (b < 10) {
    Serial.write(b + '0');
  } else {
    Serial.write(b - 10 + 'a');
  }
}

