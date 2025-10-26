class ChatroomsController < ApplicationController
  def index
    @chatrooms = Chatroom.all
    render json: @chatrooms
  end

  def show
    @chatroom = Chatroom.find(params[:id])
    render json: @chatroom
  end
end
