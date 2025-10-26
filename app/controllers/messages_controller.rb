class MessagesController < ApplicationController
  def index
    @chatroom = Chatroom.find(params[:chatroom_id])
    @messages = @chatroom.messages.order(created_at: :asc)
    render json: @messages
  end

  def create
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message = @chatroom.messages.build(message_params)

    if @message.save
      # Broadcast the message via Action Cable
      ActionCable.server.broadcast(
        "chatroom_#{@chatroom.id}",
        {
          id: @message.id,
          username: @message.username,
          content: @message.content,
          created_at: @message.created_at
        }
      )
      render json: @message, status: :created
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:username, :content)
  end
end
