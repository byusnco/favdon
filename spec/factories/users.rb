FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "username_#{n}" }
    sequence(:instance) { |n| "instance_#{n}.example.com" }
    sequence(:note) { |n| "note_#{n}" }
    sequence(:url) { |n| "http://example.com/url_#{n}" }
    sequence(:avatar) { |n| "http://example.com/avatar_#{n}.jpg" }
    sequence(:statuses_count) { |n| n }
  end
end
