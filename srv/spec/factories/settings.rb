# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :setting do
    association :capability
    name "Power"
    min 0
    max 1
    value 1
  end
end
