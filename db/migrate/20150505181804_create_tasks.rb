class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :key
      t.string :priority
      t.string :reporter
      t.string :assignee
      t.string :description

      t.timestamps
    end
  end
end
