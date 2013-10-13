# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :capability do
    name "MyString"
    device_id 1
    capability_type "MyString"
  end
end
