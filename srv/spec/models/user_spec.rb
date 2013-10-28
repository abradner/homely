require 'spec_helper'

describe User do
  describe "Validations" do

    #Relations
    #None

    #Presence
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:encrypted_password) }
    #it { should validate_presence_of(:role) } #This gets handled by a before_validation hook

    it { should validate_uniqueness_of(:email) }

    it { should ensure_inclusion_of(:role).in_array(User.valid_roles) }
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

  describe "Creation/Deletion" do

    describe "Roles" do

      it "should know if a user is an admin" do
        user = build(:user, role: User.admin_role)

        user.admin?.should eql true
        user.normal_user?.should eql true

      end

      it "should know if a user is a normal user" do
        user = build(:user, role: User.user_role)

        user.admin?.should eql false
        user.normal_user?.should eql true

      end

      it "should classify anyone not a normal / admin user as a guest" do
        user = build(:user, role: "guest")

        user.admin?.should eql false
        user.normal_user?.should eql false
        user.guest?.should eql true

      end


      specify "the first user to sign up should be given the role admin" do

        #We need to be the first user
        User.delete_all

        user = User.new
        user.email = Faker::Internet.email
        user.password = "Pass.123"
        user.password_confirmation = "Pass.123"
        user.save!

        expect(user.role).to eql User.admin_role

      end

      specify "subsequent signups are given the role user" do
        create :user, role: User.admin_role

        user = User.new
        user.email = Faker::Internet.email
        user.password = "Pass.123"
        user.password_confirmation = "Pass.123"
        user.save!

        expect(user.role).to eql User.user_role
      end

    end

    specify "the last admin cannot delete their account" do
      User.delete_all

      admin1 = create :user, role: User.admin_role
      admin2 = create :user, role: User.admin_role
      admin3 = create :user, role: User.admin_role

      # To make sure it doesn't allow deletion of the last admin when there are still users
      user1 =  create :user, role: User.user_role

      expect(admin1.destroy).to eql admin1
      expect(admin2.destroy).to eql admin2
      expect(admin3.destroy).to eql false # Could not delete
    end

    specify "the last admin cannot delete their account" do
      User.delete_all

      user1 = create :user, role: User.user_role
      user2 = create :user, role: User.user_role

      expect(user1.destroy).to eql user1
      expect(user2.destroy).to eql user2
    end
  end
end
