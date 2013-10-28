# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| Faker::Internet.email }
    password "Pass.123"
    password_confirmation { "Pass.123" }
    #device_type { Device.valid_types.sample }
    role "user"
  end
end
