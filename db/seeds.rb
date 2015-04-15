User.create!(name:  'admin',
             email: 'admin@gmail.com',
             password:              '111111',
             password_confirmation: '111111',
             admin: true)

20.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+2}@railstutorial.org"
  password = '123456'
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password)
end

# bundle exec rake db:migrate:reset
# bundle exec rake db:seed