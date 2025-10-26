import React from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { CardFooter } from '../../ui/card'

interface ChatroomInputProps {
  username: string
  content: string
  error: string | null
  isConnected: boolean
  onUsernameChange: (value: string) => void
  onContentChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onErrorDismiss: () => void
}

export const ChatroomInput: React.FC<ChatroomInputProps> = ({ 
  username, 
  content, 
  error, 
  isConnected, 
  onUsernameChange, 
  onContentChange, 
  onSubmit, 
  onErrorDismiss 
}) => {
  return (
    <CardFooter className="border-t bg-white p-6">
      <form onSubmit={onSubmit} className="w-full">
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
            <button
              type="button"
              onClick={onErrorDismiss}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Input
              id="username"
              placeholder="Your name"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              required
              className="w-32 focus:ring-2 focus:ring-blue-500 placeholder:opacity-50"
            />
          </div>
          <div className="flex-1 flex gap-2">
            <Input
              id="content"
              placeholder="Type your message..."
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              required
              className="flex-1 focus:ring-2 focus:ring-blue-500 placeholder:opacity-50"
            />
            <Button 
              type="submit" 
              disabled={!isConnected || !username.trim() || !content.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </CardFooter>
  )
}
