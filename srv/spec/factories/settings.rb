# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :setting do
    association :capability
    type "Power"
    value 1
    #power { [true,false].sample }
    #mode "MyString"
  end
end
