import clsx from 'clsx'

import { useUI } from '../../../stores/useUI'
import { Header } from './Header'
import { Links } from './Links'
import c from './Menu.module.scss'

export const Menu = () => {
  const isScreenWide = useUI(state => state.isScreenWide)
  const isMenuOpened = useUI(state => state.isMenuOpened)
  const isPopupOpened = useUI(state => state.isPopupOpened)
  const closeMenu = useUI(state => state.closeMenu)

  return (
    <div
      className={clsx(c.Menu, !isScreenWide && c.index)}
      inert={(!isMenuOpened && !isScreenWide) || isPopupOpened}
      onClick={closeMenu}
    >
      <div className={c.inner} onClick={e => e.stopPropagation()}>
        <Header />
        <Links />
      </div>
    </div>
  )
}
