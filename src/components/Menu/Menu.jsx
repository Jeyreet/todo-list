import classes from './Menu.module.css'
import { Hr } from '../Hr/Hr'
import { Button } from '../buttons/Button/Button'
import { MenuLinkList } from './MenuLinkList/MenuLinkList'
import { useApp } from '../App/AppContext'
import clsx from 'clsx'
import {useEffect, useState} from 'react'

export const Menu = () => {
  const {menuOpen, modalOpen, wideScreen, closeMenu} = useApp()

  return (
    <div inert={!menuOpen && !wideScreen || modalOpen}
      className={clsx(classes.Menu, menuOpen && classes.open)}
      onClick={e => e.stopPropagation()}
    >
      <div className={classes.header}>
        <h1 className={classes.title}>Todo List</h1>
        <Button className={classes.button} onClick={closeMenu}>Закрыть</Button>
      </div>
      <Hr />
      <MenuLinkList />
    </div>
  )
}