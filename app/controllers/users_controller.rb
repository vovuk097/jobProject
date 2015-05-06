class UsersController < ApplicationController
  include UsersHelper

  before_action :authenticate_user!, only: [:index, :show, :edit, :update, :destroy]
  #comment up to denny_access
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy

  def index
    user_signed_in?
    @users = User.paginate(page: params[:page], :per_page => 5)
  end

  def home
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      #sign_in(@user)
      flash[:success] = 'Welcome !'
      redirect_to @user, notice: 'You signed up successfully'
    else
      render 'new'
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = 'Profile updated'
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = 'User deleted'
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation)
  end
end
