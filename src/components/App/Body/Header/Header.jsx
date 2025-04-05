import { Button } from '../../../controls/Button/Button.jsx'

import { useGlobalStore } from '../../../../hooks/useGlobalStore.js'
import { useEscape } from '../../../../hooks/useEscape.js'

import classes from './Header.module.css'

export const Header = () => {
  const isMenuOpen = useGlobalStore(state => state.isMenuOpen)
  const openMenu = useGlobalStore(state => state.openMenu)
  const headerTitle = useGlobalStore(state => state.headerTitle)

  useEscape(openMenu, !isMenuOpen)

  return (
    <div className={classes.Header}>
      <Button className={classes.button} onClick={openMenu}>Меню</Button>
      <h2 className={classes.title}>{headerTitle}</h2>
    </div>
  )
}