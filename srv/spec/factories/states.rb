# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :state do
    capability_id 1
    power false
    mode "MyString"
  end
end
