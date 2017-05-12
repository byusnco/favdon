Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'index#index'
  get '/auth/:provider/callback', to: 'users#create'

  get '/logout', to: 'sessions#destroy'

  resources :users, only: [:show]

  namespace :api, { format: :json } do
    namespace :v1 do
      resources :users, only: [:show] do
        get :statuses
      end
      post '/users/fetch', to: 'users#fetch'
    end
  end
end
