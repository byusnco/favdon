json.array! @statuses do |status|
  json.id status.id
  json.uri status.uri
  json.url status.url
  json.content status.content
  json.favourites_count status.favourites_count
  json.reblogs_count status.reblogs_count
  json.status_created_at status.status_created_at
  json.spoiler_text status.spoiler_text
  json.user do
    json.id status.user.id
    json.uid status.user.uid
    json.avatar status.user.avatar
    json.url status.user.url
  end
end
