class Api::V1::StatusesController < Api::V1::BaseController
  before_action :authenticate, except: :index
  before_action :set_status, except: :index

  def index
    @statuses = Status.order('favourites_count + reblogs_count DESC').limit(30)
    render 'api/v1/statuses/index.json'
  end

  def favourite
    target = current_user.client.perform_request(:get, '/api/v1/search', q: @status.url)['statuses'][0]
    res = current_user.client.favourite(target['id'])
    render json: res
  rescue Mastodon::Error::UnprocessableEntity => e
    render json: { message: e.message }
  end

  def unfavourite
    target = current_user.client.perform_request(:get, '/api/v1/search', q: @status.url)['statuses'][0]
    res = current_user.client.unfavourite(target['id'])
    render json: res
  rescue Mastodon::Error::UnprocessableEntity => e
    render json: { message: e.message }
  end

  def reblog
    target = current_user.client.perform_request(:get, '/api/v1/search', q: @status.url)['statuses'][0]
    res = current_user.client.reblog(target['id'])
    render json: res
  rescue Mastodon::Error::UnprocessableEntity => e
    render json: { message: e.message }
  end

  def unreblog
    target = current_user.client.perform_request(:get, '/api/v1/search', q: @status.url)['statuses'][0]
    res = current_user.client.unreblog(target['id'])
    render json: res
  rescue Mastodon::Error::UnprocessableEntity => e
    render json: { message: e.message }
  end

  private

  def set_status
    @status = Status.find(params[:id])
  end

end
