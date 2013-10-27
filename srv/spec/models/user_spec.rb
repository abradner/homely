require 'spec_helper'

describe User do
  describe "Validations" do

    #Relations
    #None

    #Presence
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:encrypted_password) }
    it { should validate_presence_of(:role) }

    it { should validate_uniqueness_of(:email)}

    it { should ensure_inclusion_of(:role).in_array(User.valid_roles)}
  end

  describe "Factories" do
    it "should have functional factories for testing" do
      user = FactoryGirl.build(:user)
      user.should be_valid
      user.save!

      user2 = User.find(user.id)

      user.should eq user2
    end
  end

  describe "Roles" do

    it "should know if a user is an admin" do
      user = build(:user, role: "admin")

      user.admin?.should eql true
      user.normal_user?.should eql true

    end

    it "should know if a user is a normal user" do
      user = build(:user, role: "user")

      user.admin?.should eql false
      user.normal_user?.should eql true

    end

    it "should classify anyone not a normal / admin user as a guest" do
      user = build(:user, role: "guest")

      user.admin?.should eql false
      user.normal_user?.should eql false
      user.guest?.should eql true

    end

    it "should not allow normal users to do priveleged actions" do
      pending
    end
  end

end
