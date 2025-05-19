import { create } from 'zustand'

export const useUI = create((s, g) => {
  return {
    currentPageTitle: 'Загрузка...',
    setCurrentPageTitle: title => s({ currentPageTitle: title }),

    isMenuOpened: false,
    openMenu: () => s({ isMenuOpened: true }),
    closeMenu: () => s({ isMenuOpened: false }),

    isPopupOpened: false,
    popupOpened: () => s({ isPopupOpened: true }),
    popupNotOpened: () => s({ isPopupOpened: false }),

    isScreenWide: null,
    narrowScreen: () => s({ isScreenWide: false }),
    wideScreen: () => s({ isScreenWide: true }),

    isSynced: true,
    setSynced: () => s({ isSynced: true }),
    setNotSynced: () => s({ isSynced: false })
  }
})

window.addEventListener('app_rendered', () => {
  const widthQuery = window.matchMedia('(max-width: 1100px)')
  const popupUI = document.getElementById('popup-ui')

  if (widthQuery.matches) useUI.getState().narrowScreen()
  else useUI.getState().wideScreen()

  widthQuery.addEventListener('change', e => {
    useUI.getState().closeMenu()
    if (e.matches) useUI.getState().narrowScreen()
    else useUI.getState().wideScreen()
  })

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const children = popupUI.children

      if (children.length === 0) {
        if (useUI.getState().isMenuOpened) useUI.getState().closeMenu()
        else useUI.getState().openMenu()
      } else children[children.length - 1].close()
    }
  })

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.type === 'childList' &&
        (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
      ) {
        const children = Array.from(popupUI.children)

        if (children.length !== 0) {
          const lastChild = children[children.length - 1]
          const restChildren = children.slice(0, children.length - 1)

          restChildren.forEach(child => child.setAttribute('inert', 'true'))
          lastChild.removeAttribute('inert')
          useUI.getState().popupOpened()
        } else useUI.getState().popupNotOpened()
      }
    })
  })

  observer.observe(popupUI, {
    childList: true,
    subtree: false
  })
})
