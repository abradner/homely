class SettingsController < ApplicationController
  before_filter :authenticate_user!

  def index

    @settings= Setting.where(capability_id: params[:capability_id])

    respond_to do |format|
      format.html
      format.json {
        render :json => @settings.to_json
      }
    end


  end

end

