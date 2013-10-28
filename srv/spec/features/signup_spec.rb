require 'spec_helper'

describe 'Signup' do
  specify "new users should be able to sign up" do

    visit new_user_registration_path

    fill_in 'Email', with: Faker::Internet.email
    fill_in 'Password', with: 'Pass.123'
    fill_in 'Password confirmation', with: 'Pass.123'

    click_button 'Sign up'

    expect(page).to have_content I18n.t('devise.registrations.signed_up')


  end
end