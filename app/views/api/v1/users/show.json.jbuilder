json.id @user.id
json.username @user.username
json.note @user.note
json.url @user.url
json.avatar @user.avatar
json.instance @user.instance
json.favoured_count @user.statuses.sum(:favourites_count)
json.reblogged_count @user.statuses.sum(:reblogs_count)
