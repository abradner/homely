# Sample Sidekiq worker; puts every time we change colour
class SendDataWorker
  include Sidekiq::Worker
  sidekiq_options queue: :often
  sidekiq_options retry: false

  def perform(colour)

    puts "Changed arduino to #{colour}"
    data = "check new message"
    message = {:channel => 'connect', :data => data}
    uri = URI.parse("http://localhost:3000/faye")
    Net::HTTP.post_form(uri, :message => message.to_json)
  end

end