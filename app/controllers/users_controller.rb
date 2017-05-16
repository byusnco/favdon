class UsersController < ApplicationController

  def show
  end

  # omniauth callback
  def create
    @auth = request.env['omniauth.auth']
    user_info = @auth['extra']['raw_info']

    uri = URI.parse(user_info['url'])
    # @auth['uid'] is from user input not omniauth callback, so don't use that
    uid = "#{uri.path.split('@')[1]}@#{uri.host}"

    @user = User.find_or_create_by(uid: uid) do |user|
      user.token    = @auth['credentials']['token']

      user.instance_account_id = user_info['id']
      user.username = user_info['username']
      user.note     = user_info['note']
      user.avatar   = user_info['avatar']
      user.url      = user_info['url']
      user.statuses_count = user_info['statuses_count']
      user.instance = @auth['uid'].split('@')[1]
    end
    cookies[:auth_token] = issue_jwt_token({user_id: @user.id})
    cookies[:current_user_id] = @user.id
    cookies[:avatar] = @user.avatar
    redirect_to @user
  end

end

