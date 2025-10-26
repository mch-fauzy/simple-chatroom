import type { Message, Chatroom, CreateMessageParams } from '@/types/chatroom.types'

export const chatroomService = {
  async fetchChatrooms(): Promise<Chatroom[]> {
    const response = await fetch('/chatrooms')
    if (!response.ok) {
      throw new Error(`Failed to fetch chatrooms: ${response.statusText}`)
    }
    return response.json()
  },

  async fetchMessages(chatroomId: number): Promise<Message[]> {
    const response = await fetch(`/chatrooms/${chatroomId}/messages`)
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`)
    }
    return response.json()
  },

  async createMessage({ chatroomId, username, content }: CreateMessageParams): Promise<void> {
    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || ''
    
    const response = await fetch(`/chatrooms/${chatroomId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        message: {
          username: username.trim(),
          content: content.trim()
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || errorData.message || `Error: ${response.status} ${response.statusText}`)
    }
  }
}
