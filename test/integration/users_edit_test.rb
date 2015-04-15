require 'test_helper'

class UsersEditTest < ActionDispatch::IntegrationTest

  def setup
      @user = users(:Volodymyr)
  end

  test 'unsuccessful edit' do
    get edit_user_path(@user)
    patch user_path(@user), user: { name:  '',
                                    email: 'foo@invalid',
                                    password:              'foo',
                                    password_confirmation: 'bar' }
  end

  test 'successful edit' do
    get edit_user_path(@user)
    name  = 'Volodymyr P'
    email = 'vovo@gmail.com'
    patch user_path(@user), user: { name:  name,
                                    email: email,
                                    password:              '',
                                    password_confirmation: '' }
    @user.reload
    assert_equal @user.name,  name
    assert_equal @user.email, email
  end

end
