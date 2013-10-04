require 'socket'

class TCPArduinoCommunicator < ArduinoCommunicator

  def initialize
    super

    @device = TCPSocket.open("192.168.16.50",5100)


  end

  def send!(message)
    super
  end

end
