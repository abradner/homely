class StatesController < ApplicationController

  def index

    @states = State.where(capability_id: params[:capability_id])

    respond_to do |format|
      format.html
      format.json {
        render :json => @states.to_json
      }
    end


  end

end

