class RoomsController < ApplicationController
  before_filter :authenticate_user!

  def index

    @rooms = Room.all
    hash = @rooms.to_a.map(&:serializable_hash)
    hash.map! do |room|
      room["capabilities"] = Capability.where(room_id: room["id"])
      room["capabilities"].map! do |capability|
        cap = capability.attributes
        cap["settings"] = Setting.where(capability_id:  capability["id"])
        cap
      end
      room
    end

    respond_to do |format|
      format.html
      format.json {
        render :json => hash.to_json
      }
    end

  end

  def show

    @room = Room.find(params[:id])
    respond_to do |format|
      format.html {
        @capabilities = @room.capabilities
      }

      format.json {
        @hash = @room.attributes
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
