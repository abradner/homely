require 'spec_helper'

describe "Controlling capabilities" do

  before :all do
    @dev = create(:device, name: 'Device')
    @dev.capabilities.delete_all # Clear out default capabilities
    @room = create(:room, name: 'Room')
    @cap = create(:capability, device: @dev, room: @room, name: "Capability")

    @cap.settings.delete_all # Clear out default settings

    @power = create(:setting, capability: @cap, value: 0)
    @colour = create(:setting, capability: @cap, name: "Colour", value: '111111')

  end

  after :all do
    @power.delete
    @colour.delete
    @cap.delete
    @room.delete
    @dev.delete

  end

  specify "users should be able to change p9183 power state" do
    @user = create_logged_in_user

    visit device_path(@dev)
    click_link '0'

    current_path.should eql device_capability_p9813_set_power_path(@dev, @cap)


  end

  specify "users should be able to change p9183 power state" do
    @user = create_logged_in_user

    visit device_path(@dev)
    click_button 'Set'

    current_path.should eql device_capability_p9813_set_colour_path(@dev, @cap)

  end

  describe "modification" do
    before :each do
      @user = create_logged_in_user(role: 'admin')
      @user.elevate
    end

    it 'should allow editing of capabilities' do
      room1 = create :room
      room2 = create :room

      cap = create(:capability, room_id: room1)
      visit edit_device_capability_path(cap.device, cap)

      edit_string = "Editing #{cap.name}"
      expect(page).to have_content edit_string

      new_details =build(:capability, id: cap.id, room: room2)
      fill_in 'Capability name', with: new_details.name
      select new_details.room.name, from: 'Room'

      click_button 'Update Capability'
      current_path.should eql device_path(cap.device)
      expect(page).to have_content "successfully updated"

      [new_details.name, new_details.room.name].each do |element|
        expect(page).to have_content element
      end


      expect('#device_info').to_not have_content cap.name
      expect('#device_info').to_not have_content room1.name
    end
  end

end