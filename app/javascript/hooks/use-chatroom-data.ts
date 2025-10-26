import { useState, useEffect, useCallback } from 'react'
import { chatroomService } from '@/services/chatroom'
import type { Message } from '@/types/chatroom'

export const useChatroomData = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [chatroomId, setChatroomId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChatroom = async () => {
      try {
        setIsLoading(true)
        const chatrooms = await chatroomService.fetchChatrooms()
        if (chatrooms.length > 0) {
          const globalChat = chatrooms.find(c => c.name === 'Global Chat') || chatrooms[0]
          setChatroomId(globalChat.id)
          
          const msgs = await chatroomService.fetchMessages(globalChat.id)
          setMessages(msgs)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load chatroom')
      } finally {
        setIsLoading(false)
      }
    }

    loadChatroom()
  }, [])

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message])
  }, [])

  const sendMessage = useCallback(async (username: string, content: string) => {
    if (!chatroomId) return

    try {
      await chatroomService.createMessage({
        chatroomId,
        username,
        content
      })
    } catch (error) {
      throw error
    }
  }, [chatroomId])

  return {
    messages,
    chatroomId,
    error,
    isLoading,
    setError,
    addMessage,
    sendMessage
  }
}
