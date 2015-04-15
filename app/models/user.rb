class User < ActiveRecord::Base
  has_many :tasks

  attr_accessor   :password
  attr_accessible :name, :email, :password, :password_confirmation

  before_save :encrypt_password
  before_save { self.email = email.downcase }

  email_regex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i

  validates :name,      :presence     => true,
                        :length       => { :maximum => 40}
  validates :email,     :presence     => true,
                        :format       => { :with => email_regex},
                        :uniqueness   => { :case_sensitive => false}

  validates :password,  :presence     => true,
                        :confirmation => true,
                        :length       => { :within => 6..40}

  def has_password?(submitted_password)
    encrypted_password == encrypt(submitted_password)
  end

  def self.authenticate(email, submitted_password)
    user = find_by_email(email)
    return nil if user.nil?
    return user if user.has_password?(submitted_password)
  end

  private
    def encrypt_password
      self.salt = Digest::SHA2.hexdigest("#{Time.now.utc}--#{password}") if self.new_record?

      self.encrypted_password = encrypt(password)
    end

    def encrypt(pass)
      Digest::SHA2.hexdigest("#{self.salt}--#{pass}")
    end

end
