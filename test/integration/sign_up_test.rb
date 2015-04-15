require 'test_helper'

class SignUpTest < ActionDispatch::IntegrationTest

  test 'invalid sign_up information' do
    get sign_up_path
    assert_no_difference 'User.count' do
      post users_path, user: { name:  '',
                               email: 'user@invalid.com',
                               password:              'bar123',
                               password_confirmation: 'bar' }
    end
    assert_template 'users/new'
  end

  test 'valid sign_up information' do
    get sign_up_path
    assert_difference 'User.count', 1 do
      post_via_redirect users_path, user: { name:  'Example User',
                                            email: 'user@example.com',
                                            password:              'password',
                                            password_confirmation: 'password' }
    end
    assert_template 'users/show'
  end

end
