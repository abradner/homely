class CapabilitiesController < ApplicationController

  def index

    @capabilities = Capability.where(device_id: params[:device_id])

    respond_to do |format|
      format.html
      format.json {
        render :json => @capabilities.to_json
      }
    end

  end

  def p9813_set_power

    load_resource

    mode = params[:mode].to_s

    if mode.to_s.downcase.eql? "on"
      @capability.p9813_on
    elsif mode.to_s.downcase.eql? "off"
      @capability.p9813_off

    else
      @capability.p9813_power_toggle
    end

    render "devices/show"
  end


  def p9813_set_colour
    load_resource

    colour = params[:colour]
    unless colour.blank?
      @capability.p9813_colour = colour
    end
    render "devices/show"

  end

  private
  def load_resource
    @capabilities = Capability.where(device_id: params[:device_id])
    @capability = Capability.find(params[:capability_id])
    @device = @capability.device
  end

end
