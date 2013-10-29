require 'spec_helper'

def create_logged_in_user(hash = {})
  user = create(:user, hash)
  login_via_page_as(user)
  user
end

def login_via_page_as(user)
  visit new_user_session_path
  fill_in "Email", with: user.email
  fill_in "Password", with: user.password
  click_button 'Sign in'
end

def logout_via_page
  click_link "Sign out"
end

def elevate_user(user)
  #nb - doesn't call save
  user.elevation_time = Time.now
end

def elevate_via_page
  click_link "Enable Management"
end

#def login(user)
#  login_as user, scope: :user
#end

#let(:user) { build(:user, role: 'user') }
#let(:admin) { build(:user, role: 'admin') }
