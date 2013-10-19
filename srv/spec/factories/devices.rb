# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :device do
    sequence(:name) { |n| Faker::Product.brand + ' ' + n.to_s }
    device_type { Device.valid_types.sample }
    interface "Emulated"
    sequence :address
  end
end
