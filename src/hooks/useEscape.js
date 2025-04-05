import { useEffect } from 'react'
import { useGlobalStore } from './useGlobalStore.js'

export const useEscape = (handler, isActive) => {
  const addEscapeHandler = useGlobalStore(state => state.addEscapeHandler)
  const removeEscapeHandler = useGlobalStore(state => state.removeEscapeHandler)

  useEffect(() => {
    if (isActive) {
      addEscapeHandler(handler)
      return () => removeEscapeHandler(handler)
    }
  }, [isActive, handler])
}