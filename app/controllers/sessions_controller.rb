class SessionsController < ApplicationController
  def new
    if signed_in?
      redirect_to current_user, :notice =>'Logged in!'
    end
  end

  def create

    user = User.authenticate(params[:email].downcase,params[:password])

    if user
      sign_in(user)
      #session[:user_id] = user.id
      redirect_to user, :notice => 'Logged in!'
    else
      flash.now[:danger] = 'Invalid email/password'
      render 'new'
    end

  end

  def destroy
    signed_out#session[:user_id] = nil
    redirect_to log_in_path, :notice => 'Logged out!'
  end
end
