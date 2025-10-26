import React from 'react'
import { formatTime } from '@/lib/format'
import type { Message } from '@/types/chatroom.types'

interface ChatroomMessageItemProps {
  message: Message
  isOwnMessage: boolean
}

export const ChatroomMessageItem: React.FC<ChatroomMessageItemProps> = ({ message, isOwnMessage }) => {
  return (
    <div className="flex gap-3 p-3 transition-all duration-150 hover:bg-slate-50/50 rounded-lg">
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ${
          isOwnMessage 
            ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
            : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}>
          {message.username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1">
          <span className={`font-semibold ${isOwnMessage ? 'text-green-700' : 'text-gray-900'}`}>
            {isOwnMessage ? 'You' : message.username}
          </span>
          <span className="text-xs text-gray-500">{formatTime(message.created_at)}</span>
        </div>
        <div className={`inline-block rounded-2xl px-4 py-2 shadow-sm ${
          isOwnMessage
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
            : 'bg-white border border-gray-200 text-gray-700'
        }`}>
          <p className="break-words leading-relaxed">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
