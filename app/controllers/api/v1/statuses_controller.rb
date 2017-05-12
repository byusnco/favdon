class Api::V1::StatusesController < Api::V1::BaseController

  def index
    @statuses = Status.order('favourites_count + reblogs_count DESC').limit(30)
    render 'api/v1/statuses/index.json'
  end

end
