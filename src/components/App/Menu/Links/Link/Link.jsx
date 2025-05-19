import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import { useUI } from '../../../../../stores/useUI'
import c from './Link.module.scss'

export const Link = ({ icon: Icon, url, children }) => {
  const closeMenu = useUI(state => state.closeMenu)

  return (
    <NavLink
      className={({ isActive }) => clsx(c.Link, isActive && c.active)}
      to={url}
      onClick={closeMenu}
    >
      <Icon className={c.icon} />
      {children}
    </NavLink>
  )
}
