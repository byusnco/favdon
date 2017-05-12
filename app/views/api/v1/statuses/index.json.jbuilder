json.array! @statuses do |status|
  json.uri status.uri
  json.url status.url
  json.content status.content
  json.favourites_count status.favourites_count
  json.reblogs_count status.reblogs_count
  json.user do
    json.id status.user.id
    json.uid status.user.uid
    json.avatar status.user.avatar
    json.url status.user.url
  end
end
