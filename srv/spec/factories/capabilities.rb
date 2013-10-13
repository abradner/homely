# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :capability do
    name "MyString"
    capability_type "MyString"
    association :device
  end
end
