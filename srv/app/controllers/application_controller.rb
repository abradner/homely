class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :set_access, :cancan_workaround

  def set_access
    headers["Access-Control-Allow-Origin"] = "*"
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  #Broken CanCan workaround
  #https://github.com/ryanb/cancan/issues/835#issuecomment-18663815
  def cancan_workaround
    resource = controller_name.singularize.to_sym
    method = "#{resource}_params"
    params[resource] &&= send(method) if respond_to?(method, true)
  end

end
