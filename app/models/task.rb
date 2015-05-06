class Task < ActiveRecord::Base

  belongs_to :user
  before_save :update_user_id
  before_update :update_user_id

  attr_accessible :key, :priority, :reporter, :assignee, :description


  def update_user_id
    self.user_id=(User.find_by(name: self.assignee)).id if User.find_by(name: self.assignee)
  end

end