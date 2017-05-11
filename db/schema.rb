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

ActiveRecord::Schema.define(version: 20170510083150) do

  create_table "mastodon_clients", force: :cascade do |t|
    t.string "domain"
    t.string "client_id"
    t.string "client_secret"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statuses", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "uri", null: false
    t.string "url"
    t.text "content"
    t.integer "favourites_count"
    t.integer "reblogs_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "instance"
    t.text "note"
    t.string "url"
    t.text "avatar"
    t.integer "statuses_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "token"
    t.string "uid"
    t.integer "instance_account_id"
  end

end
