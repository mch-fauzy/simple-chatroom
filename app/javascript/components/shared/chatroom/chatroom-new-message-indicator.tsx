import React from 'react'

interface ChatroomNewMessageIndicatorProps {
  count: number
  isVisible: boolean
  onScrollToBottom: () => void
}

export const ChatroomNewMessageIndicator: React.FC<ChatroomNewMessageIndicatorProps> = ({ 
  count, 
  isVisible, 
  onScrollToBottom 
}) => {
  if (!isVisible || count === 0) {
    return null
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <button
        onClick={onScrollToBottom}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200 animate-bounce"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span>{count} new {count === 1 ? 'message' : 'messages'}</span>
      </button>
    </div>
  )
}
