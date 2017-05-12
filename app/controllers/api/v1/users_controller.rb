class Api::V1::UsersController < Api::V1::BaseController

  before_action :set_user, except: :fetch
  before_action :authenticate, only: :fetch

  def show
  end

  # GET /api/v1/users/:id/statuses
  def statuses
    @statuses = @user.statuses.order('favourites_count + reblogs_count DESC')
    render 'api/v1/statuses/index.json'
  end

  # TODO: POST /api/v1/statuses/fetch is better?
  # POST /api/v1/users/fetch
  def fetch
    @objects = current_user.get_statuses
    @statuses = []
    @objects.each do |object|
      if object.favourites_count != 0 && object.reblogs_count != 0
        @statuses << Status.find_or_create_by(uri: object.uri) do |status|
          status.url = object.url
          status.content = object.content
          status.favourites_count = object.favourites_count
          status.reblogs_count = object.reblogs_count
          status.user_id = current_user.id
        end
      end
      #TODO: update counts if not new record
    end
    render 'api/v1/statuses/index.json'
  end

  private

  def set_user
    id = params[:id] ? params[:id] : params[:user_id]
    @user = User.find(id)
  end

end
