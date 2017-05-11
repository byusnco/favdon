Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'index#index'
  get '/auth/:provider/callback', to: 'users#create'

  delete 'logout', to: 'sessions#destroy'

  resources :users, only: [:show]

  namespace :api, { format: :json } do
    namespace :v1 do
      resources :users, only: [:show] do
        get :statuses
        post :fetch
      end
    end
  end
end
