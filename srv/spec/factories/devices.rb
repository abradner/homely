# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :device do
    sequence(:name) { |n| Faker::Product.brand + ' ' + n.to_s }
    sequence(:id) { |n| n}
    device_type { Device.valid_types.sample }
    interface "Emulated"
    sequence(:address) { |n| "/dev/tty.device.#{n}"}
  end
end
