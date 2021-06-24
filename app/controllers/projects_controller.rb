class ProjectsController < ApplicationController
    def index
        @project = glp
    end
    def get_all_projects
        @project = glp
        render json: @project
    end
    def create
        if params[:project] != 'new'
            Todo.create(text: params[:todo_name], category_id: params[:project], is_completed: false)
        else
            new_project = Project.create(title: params[:category_name])
            Todo.create(text: params[:todo_name], category_id: new_project.id, is_completed: false)
        end
        render json: {status: "ok", projects: glp}
    end
    def update
        todo = Todo.find(params[:todo_id])
        todo.update(is_completed: params[:isChecked])
        render json: {status: "ok", projects: glp}
    end

    private
    def glp
        @project = Project.all.order(:id).as_json
        @project.each do |p|
            @todos = Todo.all.where(category_id: p['id']).order(:id).as_json
            @todos.each do |t|
                t.delete('category_id')
            end
            p['todos'] = @todos
        end
        @project
    end
end