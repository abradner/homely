require 'spec_helper'

describe "User Sessions" do
  let(:pass) {"Pass.123"}
  let(:email) {"a@b.c"}
  let!(:user) { create(:user, email: email, password: pass, password_confirmation: pass) }


  before do
    visit root_path
    within('.navbar') { click_link 'Sign in' }
  end

  context "failure" do
    before do
      fill_in 'Email', with: email
      fill_in 'Password', with: ''
      click_button 'Sign in'
    end

    it "displays an error message" do
      expect(page).to have_content("Invalid email or password.")
    end

    it "shows the correct navigation links" do
      expect(page).to have_link('Sign in')
      expect(page).to have_link('Sign up')
      expect(page).to_not have_link('Edit account')
      expect(page).to_not have_link('Sign out')
    end
  end

  context "success" do
    before do
      fill_in 'Email', with: email
      fill_in 'Password', with: pass
      click_button 'Sign in'
    end

    it "displays a welcome message" do
      expect(page).to have_content('Signed in successfully.')
    end

    it "shows the correct navigation links" do
      within('.navbar') do
        expect(page).to have_link('Edit account')
        expect(page).to have_link('Sign out')
        expect(page).to_not have_link('Sign in')
        expect(page).to_not have_link('Sign up')
      end
    end
  end

end