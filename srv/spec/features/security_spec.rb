require 'spec_helper'

describe "Security" do
  #let(:pass) {"Pass.123"}
  #let(:email) {"a@b.c"}
  #let!(:user) { create(:user, email: email, password: pass, password_confirmation: pass) }

  context "Hiding protected resources" do

    it "should display a splash page asking the user to log in" do
      visit root_path
    end

    it 'should not allow me to access device overview direclty' do
      visit devices_path
    end

    it 'should not allow me to access individual devices directly' do
      device =  create(:device)
      visit device_path(device)
    end

    after :each do
      current_path.should eql new_user_session_path
      expect(page).to have_content I18n.t('devise.failure.unauthenticated')

    end

end
end
