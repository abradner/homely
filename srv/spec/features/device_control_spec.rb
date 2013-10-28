require 'spec_helper'

describe "Device control" do
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

  def login(user)
    login_as user, scope: :user
  end

  #let(:user) { build(:user, role: 'user') }
  #let(:admin) { build(:user, role: 'admin') }


  context "device creation" do
    def expect_to_see_device(dev)
      expect(page).to have_content dev.name
      expect(page).to have_content dev.interface
      expect(page).to have_content dev.device_type
      expect(page).to have_content dev.address
    end

    before :each do
      @user = create_logged_in_user(role: 'admin')
    end

    it 'should show a list of my current devices' do
      dev1 = create(:device)
      dev2 = create(:device)

      visit devices_path

      expect_to_see_device(dev1)
      expect_to_see_device(dev2)

    end
    it 'admin users should have permission to create new devices' do
      visit new_device_path
      expect(page).to have_content "Create New Device"
    end

    it 'should correctly create devices' do

      dev = build(:device)
      visit new_device_path
      fill_in 'Device name', with: dev.name
      select dev.device_type, from: 'Device type'
      select dev.interface, from: 'Interface'
      fill_in 'Address', with: dev.address
      click_button 'Create Device'

      current_path.should eql device_path(dev)

      expect(page).to have_content "successfully created"

      expect(page).to have_content dev.name
      expect(page).to have_content dev.device_type
      expect(page).to have_content dev.interface
      expect(page).to have_content dev.address

    end


    it 'should not allow the creation of devices by regular users' do
      pending
      login user
      visit new_device_path
      expect(page).to_not have_content "Create New Device"
      expect(page).to have_content "You are not authorised to create new devices"
    end
  end
end
