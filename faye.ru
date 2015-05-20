require 'faye'
Faye::WebSocket.load_adapter('thin')
require File.expand_path('../config/initializers/faye_token.rb', __FILE__)

class ServerAuth
  def incoming(task, callback)
    if task['channel'] !~ %r{^/meta/}
      if task['ext']['auth_token'] != FAYE_TOKEN
        task['error'] = 'Invalid authentication token'
      end
    end
    callback.call(task)
  end
end

faye_server = Faye::RackAdapter.new(:mount => '/faye', :timeout => 45)
faye_server.add_extension(ServerAuth.new)
run faye_server
