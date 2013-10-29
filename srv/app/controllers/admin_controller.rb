class AdminController < ApplicationController
  before_filter :authenticate_user!

  def elevate
    current_user.elevate
    flash[:notice] = "Admin privileges enabled for one hour."
    redirect_to :back
  end

  def lower
    current_user.lower
    flash[:notice] = "Privileges lowered back to normal level."
    redirect_to :back
  end
end
