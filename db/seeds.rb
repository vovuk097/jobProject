=begin
User.create!(name:  'admin',
             email: 'admin@gmail.com',
             password:              '11111111',
             password_confirmation: '11111111')
=end

=begin
20.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+2}@railstutorial.org"
  password = '12345678'
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password)
end
=end

# bundle exec rake db:migrate:reset
# bundle exec rake db:seed

user = User.new
user.name = "admin"
user.email = "admin@gmail.com"
user.password = "11111111"
user.password_confirmation = "11111111"
user.add_role "admin"
user.save

20.times do |n|
user = User.new
user.name = Faker::Name.name
user.email = "example-#{n+2}@example.com"
user.password = "12345678"
user.password_confirmation = "12345678"
user.add_role "user"
user.save
end