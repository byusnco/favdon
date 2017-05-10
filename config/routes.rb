Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'index#index'

  namespace :api, { format: :json } do
    namespace :v1 do
      resources :users, only: [:show]
    end
  end
end
