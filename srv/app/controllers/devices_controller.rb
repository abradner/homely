class DevicesController < ApplicationController
  def index
    @devices = Device.all
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

    puts hash
    respond_to do |format|
      format.html
      format.json {
        render :json => hash.to_json
      }
    end

  end

  def show

    @device = Device.find(params[:id])

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


end
