import React from 'react'
import { ChatroomEmptyState } from './chatroom-empty-state'
import { ChatroomMessageItem } from './chatroom-message-item'
import type { Message } from '@/types/chatroom'

interface ChatroomMessageListProps {
  messages: Message[]
  username: string
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void
  scrollRef: React.RefObject<HTMLDivElement | null>
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

export const ChatroomMessageList: React.FC<ChatroomMessageListProps> = ({ 
  messages, 
  username, 
  onScroll, 
  scrollRef, 
  scrollContainerRef 
}) => {
  return (
    <div 
      ref={scrollContainerRef}
      className="h-full overflow-y-auto"
      onScroll={onScroll}
    >
      <div className="p-6 space-y-4">
        {messages.length === 0 ? (
          <ChatroomEmptyState />
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.username === username
            
            return (
              <ChatroomMessageItem 
                key={msg.id} 
                message={msg} 
                isOwnMessage={isOwnMessage} 
              />
            )
          })
        )}
        <div ref={scrollRef} />
      </div>
    </div>
  )
}
