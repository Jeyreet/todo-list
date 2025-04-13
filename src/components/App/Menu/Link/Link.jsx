import { NavLink } from 'react-router-dom'

import { useEffect, useRef } from 'react'
import { useGlobalStore } from '../../../../hooks/useGlobalStore.js'

import clsx from 'clsx'
import classes from './Link.module.css'

export const Link = ({children, to, autoFocus, ...props}) => {
  const isMenuOpen = useGlobalStore(state => state.isMenuOpen)
  const closeMenu = useGlobalStore(state => state.closeMenu)
  const linkRef = useRef(null)

  useEffect(() => {
    if (isMenuOpen && autoFocus) linkRef.current.focus()
  }, [isMenuOpen]);

  return (
    <NavLink
      className={({isActive}) => clsx(
        classes.MenuLink,
        isActive && classes.selected
      )}
      to={to}
      onClick={closeMenu}
      ref={linkRef}
      {...props}
    >
      {children}
    </NavLink>
  )
}