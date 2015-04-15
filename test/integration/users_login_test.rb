require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:Volodymyr)
  end



  test 'login with valid information' do
    get log_in_path
    get log_in_post_path, session: { email: @user.email, password: '123456' }
    assert_not is_logged_in?
  end



  test 'login with valid information followed by logout' do
    get log_in_path
    get log_in_post_path, session: { email: @user.email, password: @user.password }
    assert_not is_logged_in?
    get log_out_path
    assert_not is_logged_in?
  end



  test 'login with invalid information' do
    get log_in_path
    assert_template 'sessions/new'
    post sessions_path, session: { email: ' ', password: '' }
    assert_template 'sessions/new'
    assert_not flash.empty?
  end

  test 'valid signup information' do
    get sign_up_path
    assert_difference 'User.count', 1 do
      post_via_redirect users_path, user: { name:  "Example User",
                                            email: "user@example.com",
                                            password:              "password",
                                            password_confirmation: "password" }
    end
    assert_template 'users/show'
    assert is_logged_in?
  end

end
