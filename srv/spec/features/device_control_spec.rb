require 'spec_helper'

describe "Device control" do


  context "device management" do

    #Helpers
    def expect_device(dev, see)
      [dev.name, dev.interface, dev.device_type, dev.address].each do |element|
        if see.eql? true
          expect(page).to have_content element
        else
          expect(page).to_not have_content element
        end
      end

    end

    def expect_to_see_device (dev)
      expect_device(dev, true)
    end

    def expect_to_not_see_device (dev)
      expect_device(dev, false)
    end

    # Callbacks
    before :each do
      @user = create_logged_in_user(role: 'admin')
      @user.elevate
    end

    #Tests
    it 'should show a list of my current devices' do
      dev1 = create(:device)
      dev2 = create(:device)
      dev1.capabilities.delete_all
      dev2.capabilities.delete_all
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
      expect_to_see_device(dev)
    end

    it 'should allow editing of devices' do
      dev = create(:device)
      visit edit_device_path(dev)

      edit_string = "Editing #{dev.name}"
      expect(page).to have_content edit_string

      new_details =build(:device, id: dev.id)

      fill_in 'Device name', with: new_details.name
      select new_details.device_type, from: 'Device type'
      select new_details.interface, from: 'Interface'
      fill_in 'Address', with: new_details.address

      click_button 'Update Device'
      current_path.should eql device_path(dev)
      expect(page).to have_content "successfully updated"

      expect_to_see_device(new_details)

      expect('#device_info').to_not have_content dev.name
      expect('#device_info').to_not have_content dev.address
    end

    it 'should allow deletion of devices' do
      dev = create(:device)

      visit devices_path
      expect_to_see_device(dev)

      page.driver.submit :delete, "/devices/#{dev.id}", {}

      current_path.should eql devices_path
      expect(page).to have_content "successfully deleted"

      expect_to_not_see_device(dev)

    end

  end


  context "authorisation" do
    before :all do
      @static_dev = create(:device)
    end

    after :all do
      @static_dev.destroy
    end

    it 'should not allow the creation of devices by regular users' do
      "Access control needs to be implemented first"
      @user = create_logged_in_user(role: 'user')
      visit new_device_path
      expect(page).to_not have_content "Create New Device"
      expect(page).to have_content "not authorized"
    end

    it 'should not show create/edit/delete/connect/ping device links for regular users' do
      "Access control needs to be implemented first"
      @user = create_logged_in_user(role: 'user')
      visit devices_path

      expect(page).to_not have_content "Create New Device"
      within('#devices_table') do
        expect(page).to_not have_content "Edit"
        expect(page).to_not have_content "Ping"
        expect('td').to_not have_content "Connect"
        expect(page).to_not have_content "Delete"
      end
    end
    it 'should show create/edit/delete device links for elevated admin users' do
      @user = create_logged_in_user(role: 'admin')

      elevate_via_page

      visit devices_path

      expect(page).to have_content "Create New Device"
      within('#devices_table') do
        #expect('td').to have_content "Connect"
        expect(page).to have_content "Edit"
        expect(page).to have_content "Delete"
      end

    end
  end


  context "ping and connect" do
    before :all do
      @static_dev = create(:device)
    end

    after :all do
      @static_dev.destroy
    end

    it 'should not allow pinging devices by regular users' do
      "Access control needs to be implemented first"
      @user = create_logged_in_user(role: 'user')
      visit devices_path
      within('#devices_table') do
        expect(page).to_not have_content "Ping"
        expect('td').to_not have_content "Ping"
        expect('td').to_not have_content "Connect"
      end
    end

    it 'should allow pinging devices by admins' do
      "Access control needs to be implemented first"
      @user = create_logged_in_user(role: 'admin')
      visit devices_path
      elevate_via_page
      within('#devices_table') do
        expect(page).to have_content "Ping"
        expect(page).to have_content "Connect"
        click_link('Connect')
        expect(page).to have_content "Ping"
      end
    end

    it 'should show messages indicating success or failure' do
      "Access control needs to be implemented first"
      @user = create_logged_in_user(role: 'admin')
      visit devices_path
      elevate_via_page
      within('#devices_table') do
        click_link('Ping')
        expect(page).to_not have_content "/\AConnect\z/"
      end
      expect(page).to have_content('Success')
      @static_dev.send!("ignore")
      within('#devices_table') do
        expect(page).to_not have_content "/\AConnect\z/"
        click_link('Ping')
      end
      expect(page).to have_content('Fail')
    end
  end

end
