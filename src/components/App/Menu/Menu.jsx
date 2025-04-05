import { MenuHeader } from './MenuHeader/MenuHeader'
import { Hr } from '../../Hr/Hr'
import { MenuLinkList } from './MenuLinkList/MenuLinkList'

import { useGlobalStore } from '../../../hooks/useGlobalStore.js'
import { useEscape } from '../../../hooks/useEscape.js'

import classes from './Menu.module.css'

export const Menu = () => {
  const isMenuOpen = useGlobalStore(state => state.isMenuOpen)
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const isScreenWide = useGlobalStore(state => state.isScreenWide)
  const closeMenu = useGlobalStore(state => state.closeMenu)

  useEscape(closeMenu, isMenuOpen)

  return (
    <div
      className={classes.Menu}
      onClick={closeMenu}
      inert={!isMenuOpen && !isScreenWide || isModalOpen}
    >
      <div
        className={classes.inner}
        onClick={e => e.stopPropagation()}
      >
        <MenuHeader />
        <Hr />
        <MenuLinkList />
      </div>
    </div>
  )
}