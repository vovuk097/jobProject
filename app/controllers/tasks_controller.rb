class TasksController < ApplicationController
  include TasksHelper
  before_action :set_task, only: [:show, :edit, :update, :destroy]
  before_action :user_signed_in?, only: [:show, :new, :index, :edit, :update, :destroy]
  #before_action :admin_user,     only: :destroy
  before_action :correct_user,   only: [:edit, :update, :destroy]

  def index
    @tasks = Task.paginate(page: params[:page], :per_page => 6)
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
    @task = Task.new(task_params,user_id: User.find_by_name(:reporter))
    respond_to do |format|
      if @task.save
        format.html { redirect_to @task, notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }
      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def task_params
    params.require(:task).permit(:key, :priority, :reporter, :assignee, :description)
  end
end