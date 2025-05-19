import { useRef, useState } from 'react'

export const usePopup = (_isOpened = false) => {
  const [isOpened, setIsOpened] = useState(_isOpened)

  return {
    isOpened,
    open: () => setIsOpened(true),
    close: () => setIsOpened(false),
    ref: useRef(null)
  }
}
