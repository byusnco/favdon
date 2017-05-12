require 'jwt'

module SessionsHelper

  def logout
    cookies.delete(:auth_token)
    cookies.delete(:current_user_id)
  end

  # from http://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/
  ALGORITHM = 'HS256'
  def issue_jwt_token(payload)
    JWT.encode(
      payload,
      Rails.application.secrets.jwt_auth_secret,
      ALGORITHM
    )
  end

  def decode_jwt_token(token)
    JWT.decode(
      token,
      Rails.application.secrets.jwt_auth_secret,
      true,
      {algorithm: ALGORITHM}
    ).first
  end

end
