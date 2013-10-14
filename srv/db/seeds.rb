# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

SEED_FILENAME = 'seed.yml'
require 'yaml'
require 'seed_methods.rb'

seed_file = File.join(Rails.root, 'db', SEED_FILENAME)
@config = YAML::load_file(seed_file)

puts "Seeding Devices"
seed_devices!()
#seed_capabilities!()

puts "Seeding Capabilities"
seed_classes Device, Capability

puts "Seeding States"
seed_classes Capability, Setting
