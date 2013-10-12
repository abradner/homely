class DevicesController < ApplicationController
  def index
    @devices = Device.all
  end

  def show

    @device = Device.find(params[:id])

    respond_to do |format|
      format.html
      format.json {
        render :json => @device.to_json
      }

    end
  end


end
