require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  def setup
    @user       = users(:Volodymyr)
    @other_user = users(:other_user1)
    @non_admin  = users(:other_user2)
  end

  test 'should redirect destroy when not logged in' do
    assert_no_difference 'User.count' do
      delete :destroy, id: @user
    end
    assert_redirected_to log_in_url
  end

  test 'should redirect destroy when logged in as a non-admin' do
    log_in_as(@other_user)
    assert_no_difference 'User.count' do
      delete :destroy, id: @user
    end
    assert_redirected_to root_url
  end

  test 'index as non-admin' do
    log_in_as(@non_admin)
    assert_select 'a', text: 'delete', count: 0
  end

end
