class Api::V1::BaseController < ApplicationController
  before_action :set_default_response_format

  respond_to :json

  def logged_in?
    !!current_user
  end

  def current_user
    if auth_present?
      user = User.find(decode_jwt_token(token)["user_id"])
      if user
        @current_user ||= user
      end
    end
  end

  def authenticate
    render json: {error: "unauthorized"}, status: 401 unless logged_in?
  end

  protected

  def set_default_response_format
    request.format = :json
  end

  def token
    request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).
      flatten.last
  end

  def auth_present?
    !!request.env.fetch("HTTP_AUTHORIZATION", "").
      scan(/Bearer/).flatten.first
  end

end
