import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatRoom from '@/components/shared/chatroom/chatroom'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ChatRoom />
    </React.StrictMode>
  )
}
