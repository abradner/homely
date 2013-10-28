class UsersController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource

  #def index;  end
  #def show; end
  #
  #def edit_role
  #  if @user == current_user
  #    flash.now[:alert] = "You are changing the role of the user you are logged in as."
  #  end
  #end
  #
  #def update_role
  #  if params[:user][:role].blank?
  #    redirect_to(edit_role_user_path(@user), :alert => "Please select a role for the user.")
  #  else
  #    @user.role = params[:user][:role]
  #    if !@user.check_number_of_admins(params[:id], current_user.id)
  #      redirect_to(edit_role_user_path(@user), :alert => "Only one admin exists. You cannot change this role.")
  #    elsif @user.save
  #      redirect_to(@user, :notice => "The role for #{@user.email} was successfully updated.")
  #    end
  #  end
  #end

end