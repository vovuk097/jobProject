module UsersHelper


  def gravatar_for(user)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}"
    image_tag(gravatar_url, alt: user.name, class: "gravatar")
  end

  def admin_user
    redirect_to(root_url) unless current_user.admin?
  end

  def logged_in_user
    unless signed_in?
      flash[:danger] = 'Please log in.'
      redirect_to log_in_url
    end
  end

  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless current_user?(@user)
  end

end
