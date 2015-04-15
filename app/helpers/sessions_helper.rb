module SessionsHelper


  def sign_in(user)
    session[:user_id] = user.id
    self.current_user = user
  end


  def current_user=(user)
    @current_user = user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def signed_in?
    !current_user.nil?
  end

  def is_logged_in?
    !session[:user_id].nil?
  end

  def signed_out
    session[:user_id] = nil
    self.current_user = nil
  end

  def current_user?(user)
    user == current_user
  end

  def denny_access
    if !signed_in?
      redirect_to sign_up_path, :notice => 'Please sign in to access this page!'
    end
  end

  def current_user_task_id
    @current_user_task_id ||= Task.where(user_id: current_user.id)
  end

  def current_user_task_id?(user_id,task_user_id)
    user_id == task_user_id
  end
end
