# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :capability do
    sequence(:name) { |n| Faker::Product.brand + ' ' + n.to_s }
    capability_type { Capability.valid_types.sample }
    association :device
  end
end
