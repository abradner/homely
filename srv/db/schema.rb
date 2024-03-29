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

ActiveRecord::Schema.define(version: 20131028081510) do

  create_table "capabilities", force: true do |t|
    t.string   "name"
    t.integer  "device_id"
    t.string   "capability_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "message"
    t.integer  "prefix"
    t.integer  "room_id"
  end

  create_table "devices", force: true do |t|
    t.string   "name"
    t.string   "device_type"
    t.string   "interface"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rooms", force: true do |t|
    t.string "name"
  end

  create_table "settings", force: true do |t|
    t.integer  "capability_id"
    t.string   "value"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "min"
    t.integer  "max"
    t.integer  "room_id"
    t.integer  "device_id"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "role"
    t.string   "token_authenticatable"
    t.string   "authentication_token"
    t.datetime "elevation_time"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
