import React, { useState, useCallback } from 'react'
import { Card, CardContent } from '../../ui/card'
import { ChatroomHeader } from './chatroom-header'
import { ChatroomMessageList } from './chatroom-message-list'
import { ChatroomNewMessageIndicator } from './chatroom-new-message-indicator'
import { ChatroomInput } from './chatroom-input'
import { useChatroomData } from '@/hooks/use-chatroom-data'
import { useChatroomCable } from '@/hooks/use-chatroom-cable'
import { useScrollDetection } from '@/hooks/use-scroll-detection'
import { useAutoScroll } from '@/hooks/use-auto-scroll'

const ChatRoom: React.FC = () => {
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('')

  const {
    messages,
    chatroomId,
    chatroomName,
    error,
    setError,
    addMessage,
    sendMessage
  } = useChatroomData()

  const {
    isAtBottom,
    newMessageCount,
    handleScroll,
    incrementNewMessageCount,
    resetNewMessageCount,
    setIsAtBottom
  } = useScrollDetection()

  const { scrollRef, scrollContainerRef, scrollToBottom } = useAutoScroll({
    messages,
    isAtBottom
  })

  const handleMessageReceived = useCallback((message: typeof messages[0]) => {
    addMessage(message)
    incrementNewMessageCount()
  }, [addMessage, incrementNewMessageCount])

  const { isConnected } = useChatroomCable({
    chatroomId,
    onMessageReceived: handleMessageReceived
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim() || !content.trim()) return

    setError(null)

    try {
      await sendMessage(username, content)
      setContent('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Network error. Please check your connection.')
    }
  }

  const handleScrollToBottom = () => {
    scrollToBottom()
    setIsAtBottom(true)
    resetNewMessageCount()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <Card className="max-w-5xl mx-auto h-[92vh] flex flex-col shadow-2xl border-0 overflow-hidden">
        <ChatroomHeader 
          chatroomName={chatroomName}
          isConnected={isConnected} 
          messageCount={messages.length} 
        />
        
        {/* Messages Area */}
        <CardContent className="flex-1 overflow-hidden p-0 relative">
          <ChatroomMessageList 
            messages={messages}
            username={username}
            onScroll={handleScroll}
            scrollRef={scrollRef}
            scrollContainerRef={scrollContainerRef}
          />
          
          <ChatroomNewMessageIndicator
            count={newMessageCount}
            isVisible={!isAtBottom}
            onScrollToBottom={handleScrollToBottom}
          />
        </CardContent>

        <ChatroomInput
          username={username}
          content={content}
          error={error}
          isConnected={isConnected}
          onUsernameChange={setUsername}
          onContentChange={setContent}
          onSubmit={handleSubmit}
          onErrorDismiss={() => setError(null)}
        />
      </Card>
    </div>
  )
}

export default ChatRoom
