import classes from './MenuLink.module.css'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import {useApp} from '../../App/AppContext.jsx'
import {useEffect, useRef} from "react";

export const MenuLink = ({children, autoFocus, to}) => {
  const {closeMenu, menuOpen} = useApp()
  const linkRef = useRef(null)

  useEffect(() => {
    if (menuOpen && autoFocus) linkRef.current.focus()
  }, [menuOpen]);

  return (
    <NavLink
      className={({isActive}) => clsx(
        classes.MenuLink,
        isActive && classes.selected
      )}
      to={to}
      onClick={closeMenu}
      ref={linkRef}
    >
      {children}
    </NavLink>
  )
}