import { useEffect, useRef, useState } from 'react'
import { createConsumer } from '@rails/actioncable'
import type { Message } from '@/types/chatroom.types'

interface UseChatroomCableProps {
  chatroomId: number | null
  onMessageReceived: (message: Message) => void
}

export const useChatroomCable = ({ chatroomId, onMessageReceived }: UseChatroomCableProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const cableRef = useRef<{ unsubscribe: () => void } | null>(null)

  useEffect(() => {
    if (!chatroomId) return

    const consumer = createConsumer('/cable')
    
    cableRef.current = consumer.subscriptions.create(
      { channel: 'ChatroomChannel', chatroom_id: chatroomId },
      {
        connected: () => setIsConnected(true),
        disconnected: () => setIsConnected(false),
        received: (data: Message) => onMessageReceived(data)
      }
    )

    return () => {
      if (cableRef.current) {
        cableRef.current.unsubscribe()
      }
    }
  }, [chatroomId, onMessageReceived])

  return { isConnected }
}
