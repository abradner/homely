# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :state do
    association :capability
    power { [true,false].sample }
    #mode "MyString"
  end
end
