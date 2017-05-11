json.array! @statuses do |status|
  json.uri status.uri
  json.url status.url
  json.content status.content
  json.favourites_count status.favourites_count
  json.reblogs_count status.reblogs_count
end
