#simplest ruby program to read from arduino serial,
#using the SerialPort gem
#(http://rubygems.org/gems/serialport)

require "serialport"

if ARGV.size < 1
  STDERR.print <<EOF
  Usage: ruby #{$0} /dev/ttyOfArduino
EOF
  exit(1)
end

#params for serial port
#port_str = "/dev/tty.usbserial-A5002rO5"  #may be different for you
port_str = ARGV[0].to_s
baud_rate = 9600
data_bits = 8
stop_bits = 1
parity = SerialPort::NONE

sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)

#  Thread.new {
#    while true do
#      STDOUT.printf("%c", sp.getc)
#    end
#  }

#  while (l = STDIN.gets) do
#    sp.write(l.sub("\n", "\r"))
#  end

open("/dev/tty", "r+") { |tty|
  tty.sync = true
  Thread.new {
    while true do
      tty.printf("%c", sp.getc)
    end
  }
  while (l = tty.gets) do
    sp.write(l.sub("\n", "\r"))
  end
}


sp.close
