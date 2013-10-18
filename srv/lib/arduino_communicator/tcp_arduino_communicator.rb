require 'socket'
require 'uri/generic'

class TCPArduinoCommunicator < ArduinoCommunicator

  def connect(address)
    TCPSocket.new
    host = URI(address).host
    port = URI(address).port
    @device = TCPSocket.open(host,port)
  end

end
