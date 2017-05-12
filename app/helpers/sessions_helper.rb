require 'jwt'

module SessionsHelper

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
