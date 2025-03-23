import classes from './Header.module.css'
import {Button} from '../buttons/Button/Button'
import {useApp} from '../App/AppContext'

export const Header = () => {
  const {openMenu, headerTitle} = useApp()

  return (
    <div className={classes.Header}>
      <Button className={classes.button} onClick={openMenu}>Меню</Button>
      <h2 className={classes.title}>{headerTitle}</h2>
    </div>
  )
}