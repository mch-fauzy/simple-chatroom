import { useEffect, useRef } from 'react'

interface UseAutoScrollProps {
  messages: unknown[]
  isAtBottom: boolean
}

export const useAutoScroll = ({ messages, isAtBottom }: UseAutoScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current && isAtBottom) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAtBottom])

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    scrollRef,
    scrollContainerRef,
    scrollToBottom
  }
}
