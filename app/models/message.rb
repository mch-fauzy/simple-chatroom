class Message < ApplicationRecord
  belongs_to :chatroom

  validates :username, presence: true
  validates :content, presence: true
end
