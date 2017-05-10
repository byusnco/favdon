require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  render_views

  let(:user){ create :user }

  before :each do
    request.env["HTTP_ACCEPT"] = 'application/json'
  end

  describe "GET #show" do
    it "retuns user" do
      get :show, params: { id: user.id }
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json['username']).to eq user.username
    end
  end

end

