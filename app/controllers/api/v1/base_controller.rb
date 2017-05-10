class Api::V1::BaseController < ApplicationController
  before_action :set_default_response_format

  respond_to :json

  protected

  def set_default_response_format
    request.format = :json
  end

end
