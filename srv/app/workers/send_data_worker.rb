# Sample Sidekiq worker; puts every time we change colour
class SendDataWorker
  include Sidekiq::Worker
  sidekiq_options queue: :often
  # sidekiq_options retry: false

  def perform(colour)
    puts "Changed arduino to #{colour}"
  end

end