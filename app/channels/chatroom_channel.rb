class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    chatroom = Chatroom.find(params[:chatroom_id])
    stream_from "chatroom_#{chatroom.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
