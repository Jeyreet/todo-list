import { Modal } from './Modal/Modal'
import { Menu } from './Menu/Menu'
import { Body } from './Body/Body'

import classes from './App.module.css'

export const App = () => {
  return (
    <div className={classes.App}>
      <Modal />
      <Menu />
      <Body />
    </div>
  )
}