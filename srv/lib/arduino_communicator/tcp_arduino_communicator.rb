require 'socket'
#require 'uri/generic'

class TCPArduinoCommunicator < ArduinoCommunicator

  @address = nil
  @rescued = false


  def connect(address)

    @address = address

    host,port = address.split(':')


    begin
    sock = TCPSocket.new(host,port)
    rescue Exception => e
      puts "TCP EXCEPTION!"
      puts e.message
    end

    @device = sock
  end

  def send!(message)
    begin
      super(message)
    rescue SystemCallError
      @rescued = true
      self.connect @address
      if @rescued
        puts "Failed to reconnect to device!"
        raise
      else
        retry
      end

      @rescued = false
    end
  end

end
