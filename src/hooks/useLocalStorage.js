import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [value, setStoredValue] = useState(initialValue)

  const setValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value))
    setStoredValue(value)
  }

  return [value, setValue]
}