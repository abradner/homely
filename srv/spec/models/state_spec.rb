require 'spec_helper'

describe State do

  describe "Valdations" do

    #Relations
    it { should belong_to(:capability) }

    #Presence
    #it { should ensure_inclusion_of(:power).in_array([true,false]) } #- currently broken. need to update gem when fixed

    #Workaround
    it {
      should allow_value(true).for :power
      should allow_value(false).for :power
      should_not allow_value(nil).for :power
    }


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
