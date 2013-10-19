# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131019144613) do

  create_table "capabilities", force: true do |t|
    t.string   "name"
    t.integer  "device_id"
    t.string   "capability_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "message"
    t.integer  "prefix"
  end

  create_table "devices", force: true do |t|
    t.string   "name"
    t.string   "device_type"
    t.string   "interface"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "settings", force: true do |t|
    t.integer  "capability_id"
    t.string   "value"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "min"
    t.integer  "max"
  end

end
