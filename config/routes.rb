Rails.application.routes.draw do
  root to: "projects#index"
  get "/projects", to: "projects#index"
  get "/api/projects", to: "projects#get_all_projects"

  post "/api/todos", to: "projects#create"
  patch "/api/projects/:id/todo/:todo_id", to: "projects#update"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
