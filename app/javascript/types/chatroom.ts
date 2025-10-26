export interface Message {
  id: number
  username: string
  content: string
  created_at: string
}

export interface Chatroom {
  id: number
  name: string
}

export interface CreateMessageParams {
  chatroomId: number
  username: string
  content: string
}
