import { useState, useRef, useCallback } from 'react'

interface UseScrollDetectionResult {
  isAtBottom: boolean
  newMessageCount: number
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void
  incrementNewMessageCount: () => void
  resetNewMessageCount: () => void
  setIsAtBottom: (value: boolean) => void
}

export const useScrollDetection = (): UseScrollDetectionResult => {
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [newMessageCount, setNewMessageCount] = useState(0)
  const isAtBottomRef = useRef(true)

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const isBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 50
    setIsAtBottom(isBottom)
    isAtBottomRef.current = isBottom
    
    if (isBottom) {
      setNewMessageCount(0)
    }
  }, [])

  const incrementNewMessageCount = useCallback(() => {
    if (!isAtBottomRef.current) {
      setNewMessageCount(prev => prev + 1)
    }
  }, [])

  const resetNewMessageCount = useCallback(() => {
    setNewMessageCount(0)
  }, [])

  return {
    isAtBottom,
    newMessageCount,
    handleScroll,
    incrementNewMessageCount,
    resetNewMessageCount,
    setIsAtBottom
  }
}
