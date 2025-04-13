import {Button} from '../../../controls/Button/Button'
import ArrowLeftIcon from '../../../../assets/icons/arrow_left.svg'

import {useGlobalStore} from '../../../../hooks/useGlobalStore.js'

import classes from './Header.module.css'

export const Header = () => {
  const closeMenu = useGlobalStore(state => state.closeMenu)

  return (
    <div className={classes.Header}>
      <h1 className={classes.title}>Todo List</h1>
      <Button className={classes.button} onClick={closeMenu}>
        <ArrowLeftIcon className="icon icon--button" />
      </Button>
    </div>
  )
}