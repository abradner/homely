class CapabilitiesController < ApplicationController
  before_filter :authenticate_user!

  def index

    @capabilities = Capability.where(device_id: params[:device_id])

    respond_to do |format|
      format.html
      format.json {
        render :json => @capabilities.to_json
      }
    end

  end

  def edit
    params[:capability_id] = params[:id]
    load_resource
    authorize! :edit, @capability
  end

  def update
    @capability = Capability.find(params[:id])
    authorize! :update, @capability


    if @capability.update_attributes(params[:capability])
      redirect_to(@capability.device, :notice => 'Capability was successfully updated.')
    else
      render :action => "edit"
    end
  end

  def p9813_set_power

    load_resource

    puts params
    mode = params[:value].to_s
    uuid = params[:id]

    if mode.to_s.downcase.eql? "on" || params[:value] == 1
      @capability.p9813_on
    elsif mode.to_s.downcase.eql? "off" || params[:value] == 0
      @capability.p9813_off

    else
      @capability.p9813_power_toggle
    end

    hash = { "id"         => uuid,
             "device"     => @capability.device.id,
             "capability" => @capability.id,
             "setting"    => @capability.settings.where(name: 'Power').first.id,
             "value"      => @capability.settings.where(name: 'Power').first.value }

    broadcast hash

    render "devices/show"
  end


  def p9813_set_colour
    load_resource

    colour = params[:value]
    uuid = params[:id]

    unless colour.blank?
      @capability.p9813_colour = colour
    end


    hash = { "id"         => uuid,
             "device"     => @capability.device.id,
             "capability" => @capability.id,
             "setting"    => @capability.settings.where(name: 'Colour').first.id,
             "value"      => colour}

    broadcast hash

    render "devices/show"

  end


  private
  def load_resource
    @capabilities = Capability.where(device_id: params[:device_id])
    @capability = Capability.find(params[:capability_id])
    @device = @capability.device
  end

  def broadcast(hash)
    begin
      BroadcastWorker.perform_async(hash.to_json)
    rescue Redis::CannotConnectError
      flash.now[:warning] = "Could not connect to REDIS server. This update will not appear on other connected clients"
    end
  end


  def capability_params
    params.require(:capability).permit(:name, :room, :room_id)
  end

end
