require 'spec_helper'

describe Device do

  describe "Valdations" do

    #Relations
    it { should have_many(:capabilities) }

    #Presence
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:device_type) }
    it { should validate_presence_of(:interface) }

    #Uniqueness
    it { should validate_uniqueness_of(:name) }

    #Inclusion
    it { should ensure_inclusion_of(:device_type).in_array(Device.valid_types) }
    it { should ensure_inclusion_of(:interface).in_array(Device.valid_interfaces) }


  end

  describe "Factories" do
    it "should have functional factories for testing" do
      dev = FactoryGirl.build(:device)
      dev.should be_valid
      dev.save!

      dev2 = Device.find(dev.id)

      dev.should eq dev2
    end
  end

  describe "connectivity" do
    before :each do
      @dev = build(:device, device_type: "Emulated")
      @dev.connect

      @dev2 = build(:device, device_type: "Emulated")

    end

    it "should know if a configured device is connected" do
      @dev.connected?.should eql true
      @dev2.connected?.should eql false

    end

    it "should have the option of pinging a device to test connection" do
      @dev.ping?.should eql true
      @dev2.ping?.should eql false

    end

    it "should disconnect the device if ping fails" do
      @dev.send! "ignore" # make emulator unresponsive

      @dev.connected?.should eql true
      @dev.ping?.should eql false

      @dev.connected?.should eql false

    end

    it "should be able to attempt connection to a disconnected device" do

      @dev.close

      @dev.connected?.should eql false

      @dev.connect
      @dev.send! "listen" # make sure the emulator is listening

      @dev.connected?.should eql true
      @dev.ping?.should eql true

      pending

    end
  end

end
