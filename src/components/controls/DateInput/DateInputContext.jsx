import {useEffect, useState, useRef, useContext, createContext} from 'react'

const DateInputContext = createContext(null)

export const DateInputProvider = ({children, ...props}) => {
  const [isOpen, setIsOpen] = useState(false)

  const inputGroupRef = useRef(null)
  const calendarRef = useRef(null)

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const toggle = () => {
    setIsOpen(prev => !prev)
  }

  const updatePosition = () => {
    if (!inputGroupRef.current || !calendarRef.current) return

    const inputGroupRect = inputGroupRef.current.getBoundingClientRect()
    const calendarRect = calendarRef.current.getBoundingClientRect()

    calendarRef.current.style.left = `${inputGroupRect.left}px`
    calendarRef.current.style.width = `${inputGroupRect.width}px`

    if (window.innerHeight - inputGroupRect.bottom > calendarRect.height)
      calendarRef.current.style.top = `${inputGroupRect.bottom}px`
    else
      calendarRef.current.style.top = `${inputGroupRect.top - calendarRect.height}px`
  }

  useEffect(() => {
    updatePosition()
  }, [isOpen])

  useEffect(() => {
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  return (
    <DateInputContext.Provider value={{
      isOpen,
      open,
      close,
      toggle,
      inputGroupRef,
      calendarRef,
      updatePosition,
      ...props
    }}>
      {children}
    </DateInputContext.Provider>
  )
}

export const useDateInput = () => useContext(DateInputContext)