import { Header } from './Header/Header.jsx'
import { Hr } from '../../Hr/Hr'
import { LinkList } from './LinkList/LinkList.jsx'

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
        <Header />
        <Hr />
        <LinkList />
      </div>
    </div>
  )
}