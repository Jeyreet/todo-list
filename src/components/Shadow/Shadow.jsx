import classes from './Shadow.module.css'
import { useApp } from '../App/AppContext'
import clsx from 'clsx'

export const Shadow = () => {
  const {menuOpen, modalOpen, closeAll} = useApp()

  return (
    <div
      className={clsx(classes.Shadow, modalOpen && classes.wideVisible, menuOpen && classes.visible)}
      onClick={closeAll}
    />
  )
}