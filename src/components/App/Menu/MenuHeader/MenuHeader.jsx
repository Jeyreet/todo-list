import {Button} from '../../../controls/Button/Button'

import {useGlobalStore} from '../../../../hooks/useGlobalStore.js'

import classes from './MenuHeader.module.css'

export const MenuHeader = () => {
  const closeMenu = useGlobalStore(state => state.closeMenu)

  return (
    <div className={classes.Header}>
      <h1 className={classes.title}>Todo List</h1>
      <Button className={classes.button} onClick={closeMenu}>Закрыть</Button>
    </div>
  )
}