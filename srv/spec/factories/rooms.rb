# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :room do
    sequence(:name) { |n| Faker::Name.name }
    sequence(:id) { |n| n}
  end
end
