require 'spec_helper'

describe Capability do

  describe "Valdations" do

    #Relations
    it { should belong_to(:device) }
    it { should have_many(:states) }

    #Presence
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:capability_type) }

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

end
