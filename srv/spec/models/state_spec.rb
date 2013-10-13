require 'spec_helper'

describe State do

  describe "Valdations" do

    #Relations
    it { should belong_to(:capability) }

    #Presence
    it { should validate_presence_of(:power) }


  end

  describe "Factories" do
    it "should have functional factories for testing" do
      state = FactoryGirl.build(:state)
      state.should be_valid
      state.save!

      state2 = State.find(state.id)

      state.should eq state2
    end
  end


end
