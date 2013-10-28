require 'spec_helper'

describe Capability do

  describe "Valdations" do

    #Relations
    it { should belong_to(:device) }
    it { should belong_to(:room) }
    it { should have_many(:settings) }

    #Presence
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:capability_type) }
    it { should validate_presence_of(:prefix) }

    #Uniqueness
    it { should validate_uniqueness_of(:name).scoped_to(:device_id) }

    #Inclusion
    it { should ensure_inclusion_of(:capability_type).in_array(Capability.valid_types) }

  end

  describe "Factories" do
    it "should have functional factories for testing" do
      cap = FactoryGirl.build(:capability)
      cap.should be_valid
      cap.save!

      cap2 = Capability.find(cap.id)

      cap.should eq cap2
    end
  end

  describe "P9183" do
    before :each do
      @dev = create :device, device_type: "Arduino", interface: "Emulated"

      connection = EmulatedArduinoCommunicator.new
      connection.connect(@dev.address)

      suppress_warnings do
        @@dev_list[@dev.id] = connection
      end

      @cap1 = create :capability, device: @dev, capability_type: "P9813"

      create :setting, capability: @cap1, name: "Power", max: 1
      create :setting, capability: @cap1, name: "Colour", max: 255, value: "FFFFFF"
    end

    after :each do

      suppress_warnings do
        conn = @@dev_list.delete @dev.id
        conn.close
      end
    end

    it "should only be able to do P9813 tasks if the device is  P9813" do
      @cap1.capability_type = "Foo"

      expect {
        @cap1.p9813_colour = "FFFFFF"
      }.to raise_error TypeError

      expect {
        @cap1.p9813_colour
      }.to raise_error TypeError

      expect {
        @cap1.p9813_on
      }.to raise_error TypeError

      expect {
        @cap1.p9813_off
      }.to raise_error TypeError

      expect {
        @cap1.p9813_power
      }.to raise_error TypeError

      expect {
        @cap1.p9813_message "Blah"
      }.to raise_error TypeError



    end
    it "should be able to set a colour" do
      expect {
        @cap1.p9813_colour = "FFFFFF"
      }.to_not raise_error Exception
    end

    it "should be able to report current colour" do
      @cap1.p9813_colour = "ffffff"
      @cap1.p9813_colour.should eql "ffffff"
    end

    it "should report colour for #state on p9813 capabilties" do
      @cap1.p9813_colour = "ffffff"
      @cap1.state.should eql "ffffff"
    end

    it 'should be able to turn on and off' do
      expect {
        @cap1.p9813_on
      }.to_not raise_error Exception

      expect {
        @cap1.p9813_off
      }.to_not raise_error Exception


    end

    it 'should be able to report current power state' do
      @cap1.p9813_on
      @cap1.p9813_power.should eql 1

      @cap1.p9813_off
      @cap1.p9813_power.should eql 0

    end

    it "should handle #power as an alias for #p9813_power for p9813 devices" do
      @cap1.p9813_on
      @cap1.power.should eql 1

      @cap1.p9813_off
      @cap1.power.should eql 0
    end


    it 'should be able to toggle current power state' do
      @cap1.p9813_on
      @cap1.p9813_power.should eql 1

      @cap1.p9813_power_toggle
      @cap1.p9813_power.should eql 0

      @cap1.p9813_power_toggle
      @cap1.p9813_power.should eql 1

    end

    it "should know its device prefix" do
      @cap1.prefix = 1
      @cap1.prefix.should eql 1
    end

    it "should craft messages correctly" do
      @cap1.prefix = 1
      @cap1.p9813_message("123456")
      @cap1.message.should eql "(1123456)"
    end

  end

end
