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
      visibility = object.attributes['visibility']
      if visibility == 'public' || visibility == 'unlisted' # ignore private and DM
        if object.favourites_count > 0 || object.reblogs_count > 0
          status = Status.find_or_initialize_by(uri: object.uri)
          status.url = object.url
          status.content = object.content
          status.favourites_count = object.favourites_count
          status.reblogs_count = object.reblogs_count
          status.status_created_at = object.created_at
          status.spoiler_text = object.attributes['spoiler_text']
          status.sensitive = object.attributes['sensitive']

          status.user_id = current_user.id
          status.save
          @statuses << status
        end
      end
    end
    render 'api/v1/statuses/index.json'
  end

  def destroy
    current_user.destroy!
    render json: { success: true }
  end

  private

  def set_user
    id = params[:id] ? params[:id] : params[:user_id]
    @user = User.find(id)
  end

end
