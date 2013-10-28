class DevicesController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  skip_authorize_resource only: [:new,:create,:update,:destroy] #Manually handle updates

  def index
    hash = @devices.to_a.map(&:serializable_hash)
    hash.map! do |device|
      device["capabilities"] = Capability.where(device_id: device["id"])
      device["capabilities"].map! do |capability|
        cap = capability.attributes
        cap["setting"] = Setting.where(capability_id:  capability["id"])
        cap
      end
      device
    end

    respond_to do |format|
      format.html
      format.json {
        render :json => hash.to_json
      }
    end

  end

  def show
    respond_to do |format|
      format.html {
        @capabilities = @device.capabilities
      }

      format.json {
        @hash = @device.attributes
        @hash["capabilities"] = @capabilities
        @hash["capabilities"].map! do |capability|
          cap = capability.attributes
          cap["state"] = Setting.where(capability_id: capability[:id])
          cap
        end
        render :json => @hash.to_json
      }

    end
  end

  def new;  end
  def create
    @device = Device.new(params[:device])

    if @device.save
      redirect_to(@device, :notice => 'Device was successfully created.')
    else
      render :action => "new"
    end

  end

  def ping
    @device = Device.find(params[:device_id])
    if @device.ping?
      @ping_sta = "Success"
    else
      @ping_sta = "Failed"
    end
    @ping_id = params[:device_id]
    @devices = Device.all
    render "devices/index"
  end

  def connect
    @devices = Device.all
    @device = @devices.find(params[:device_id])
    if @device.connected?
      flash.now[:notice] = "Already connected."
    end

    @device.connect

    unless @device.connected?
      flash.now[:error] = "Could not reconnect. Currently only Emulated devices can reconnect"
    end
    render "devices/index"
  end

  private

  def device_params
    params.require(:device).permit(:name, :device_type, :interface, :address)
  end
end
