module TasksHelper

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def correct_user
    @task = Task.find(params[:id])
    if !current_user.admin?
      redirect_to(root_url) unless current_user_task_id?(current_user.id,@task.user_id)
    end
  end

  def current_user_tasks
    if !signed_in?
      redirect_to(root_url)
    else
      @tasks = Task.where(user_id: current_user.id)
    end
  end

  def manageUsers
    @canNotManageUsers = User.joins(:tasks).where({tasks: {priority: 'blocker'}})
    @canManageUsers = User.all - @canNotManageUsers
    @user_email = @canManageUsers.map{|u| [ u.name, u.name] }
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

  def set_task
    @task = Task.find(params[:id])
  end

end
