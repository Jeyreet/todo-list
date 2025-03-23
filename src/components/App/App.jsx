import classes from './App.module.css'
import { Modal } from '../Modal/Modal'
import { Menu } from '../Menu/Menu'
import { Content } from '../Content/Content'
import {Shadow} from '../Shadow/Shadow'
import {useApp} from './AppContext'
import {Header} from '../Header/Header'

export const App = () => {
  const {menuOpen, modalOpen, wideScreen} = useApp()

  return (
    <div className={classes.App}>
      <Modal />
      <Menu />
      <Shadow />
      <div className={classes.rightSide} inert={(menuOpen && !wideScreen) || modalOpen}>
        <Header />
        <Content />
      </div>
    </div>
  )
}