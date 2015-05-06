module UsersHelper
  def gravatar_for(user)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    image_tag(gravatar_url, alt: user.name, class: "gravatar")
  end

  def admin_user
    redirect_to(root_url) unless current_user.has_role? :admin
  end

  def logged_in_user
    unless user_signed_in?
      flash[:danger] = 'Please log in.'
      redirect_to new_user_session_path
    end
  end


  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

  def current_user?(user)
    user == current_user
  end
end
