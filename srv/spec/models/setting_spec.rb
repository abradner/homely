require 'spec_helper'

describe Setting do

  describe "Validations" do

    #Relations
    it { should belong_to(:capability) }

    #Presence
    #it { should ensure_inclusion_of(:power).in_array([true,false]) } #- currently broken. need to update gem when fixed

    #Workaround
    it {
      should_not allow_value(nil).for :type
      should_not allow_value(nil).for :value
    }


  end

  describe "Factories" do
    it "should have functional factories for testing" do
      setting = FactoryGirl.build(:setting)
      setting.should be_valid
      setting.save!

      setting2 = Setting.find(setting.id)

      setting.should eq setting2
    end
  end


end
