require 'socket'
#require 'uri/generic'

class TCPArduinoCommunicator < ArduinoCommunicator

  def connect(address)


    host,port = address.split(':')


    begin
    sock = TCPSocket.new(host,port)
    rescue Exception => e
      puts "TCP EXCEPTION!"
      puts e.message
    end

    @device = sock
  end

end
