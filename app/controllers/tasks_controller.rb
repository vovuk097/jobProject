class TasksController < ApplicationController
  include TasksHelper
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  before_action :user_signed_in?, only: [:show, :new, :index, :edit, :update, :destroy]
  #before_action :admin_user,     only: :destroy
  before_action :correct_user,   only: [:edit, :update, :destroy]

  def index
    @task = Task.new
    manageUsers
    @tasks = Task.paginate(page: params[:page], :per_page => 20).order('created_at DESC')
    respond_to do |format|
        format.html
        format.json { render json: @tasks.to_json}
        format.js {}
    end
  end

  def show
    @task = Task.find(params[:id])
  end

  def new
    manageUsers
    @task = Task.new
  end

  def edit
    manageUsers
    @task = Task.find(params[:id])
  end

  def create
    broadcast('/tasks/new')
    @task = Task.create(task_params)
    respond_to do |format|
      format.js {}
      format.json { render json: @task}
    end
  end

  # def createnew
  #   @task = Task.new(task_params,user_id: User.find_by_name(:reporter))
  #   respond_to do |format|
  #     if @task.save
  #       format.html { redirect_to @task, notice: 'Task was successfully created.' }
  #       format.json { render :show, status: :created, location: @task }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @task.errors, status: :unprocessable_entity }
  #     end
  #   enв
  # end

  def update
    status=@task.update(task_params)
    respond_to do |format|
      if status
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    broadcast('/tasks/deleted')
    flash[:success] = 'User deleted'
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
      format.js { flash[:notice] = 'Task was successfully destroyed.'}
    end
  end

  private

  def task_params
    params.require(:task).permit(:key, :priority, :reporter, :assignee, :description)
  end
end