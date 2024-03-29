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

    it "should support multiple instances of a factory" do
      dev = create :device
      dev2 = create :device
      dev.destroy!
      dev2.destroy!
    end

  end

  describe "connectivity" do
    before :each do
      @dev = build(:device, device_type: "Emulated")
      @dev.connect

      @dev2 = build(:device, device_type: "Emulated")

    end

    after :each do
      @dev.close
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

    it "should not do anything if a device is not connected and is written to" do
      @dev.close
      @dev.connected?.should eql false
      @dev.send!("000000")
    end

  end

  describe "Construction" do
    it 'should automatically have default capabilities when I build a new device' do
      dev = Device.new
      dev.name = "Device blah"
      dev.interface = "Emulated"
      dev.device_type = "Arduino"
      dev.address = "nowhere"
      dev.save.should eql true

      expect(dev.capabilities.count).to_not eql 0


    end

  end

  describe "Destruction" do
    it 'should automatically destroy any dependant capabilities on destroy' do
      dev = create :device
      dev_id = dev.id

      expect(Capability.where(device_id: dev_id).count).to_not eql 0

      dev.destroy
      expect(Capability.where(device_id: dev_id).count).to eql 0

    end

  end

end
