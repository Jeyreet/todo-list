import {createContext, useContext, useEffect, useState} from 'react'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [wideScreen, setWideScreen] = useState(true)
  const [headerTitle, setHeaderTitle] = useState('')

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1200px)")

    const handleResize = (e) => {
      if (e.matches) {
        setWideScreen(false)
        setMenuOpen(false)
      }
      else setWideScreen(true)
    }

    handleResize(mediaQuery)

    mediaQuery.addEventListener('change', handleResize)
  }, [])

  return (
    <AppContext.Provider value={{
      menuOpen,
      openMenu: () => {
        setMenuOpen(true)
      },
      closeMenu: () => {
        setMenuOpen(false)
      },
      modalOpen,
      modalContent,
      openModal: (content) => {
        setModalOpen(true)
        setModalContent(content)
      },
      closeModal: () => {
        setModalOpen(false)
      },
      closeAll: () => {
        setMenuOpen(false)
        setModalOpen(false)
      },
      wideScreen,
      headerTitle,
      setHeaderTitle
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)