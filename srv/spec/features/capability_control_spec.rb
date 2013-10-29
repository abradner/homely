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

    current_path.should eql device_capability_p9813_set_power_path(@dev,@cap)


  end

  specify "users should be able to change p9183 power state" do
    @user = create_logged_in_user

    visit device_path(@dev)
    click_button 'Set'

    current_path.should eql device_capability_p9813_set_colour_path(@dev,@cap)

  end

end