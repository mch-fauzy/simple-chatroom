import React from 'react'

interface ChatroomHeaderProps {
  isConnected: boolean
  messageCount: number
}

export const ChatroomHeader: React.FC<ChatroomHeaderProps> = ({ isConnected, messageCount }) => {
  return (
    <div className="relative p-6 border-b bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Simple Chatroom</h1>
          <p className="text-blue-100 text-sm mt-1 flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <div className="text-white/80 text-sm">
          {messageCount} {messageCount === 1 ? 'message' : 'messages'}
        </div>
      </div>
    </div>
  )
}
