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


end
