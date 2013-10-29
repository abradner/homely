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

puts "Removing old data"
Setting.delete_all
Capability.delete_all
Device.delete_all
Room.delete_all

puts "Seeding Rooms"
seed_rooms!()

#Room.reset_column_information

puts "Seeding Devices"
seed_devices!()

puts "Seeding Capabilities"
seed_capabilities!

puts "Seeding Settings"
seed_classes Capability, Setting
