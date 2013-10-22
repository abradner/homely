# Sidekiq worker to update the app when changes are made
class BroadcastWorker
  include Sidekiq::Worker
  sidekiq_options queue: :often
  sidekiq_options retry: false

  #def perform(colour)

#    puts "Changed arduino to #{colour}"
 #   data = "check new message"
  #  message = {:channel => '/connect', :data => data}
  #  uri = URI.parse("http://localhost:9292/faye")
  #  Net::HTTP.post_form(uri, :message => message.to_json)
  #end

  def perform(hash)
    message = {:channel => "/connect", :data => hash.to_s}
    uri = URI.parse("http://localhost:9292/faye")
    Net::HTTP.post_form(uri, :message => message.to_json)
  end

end
