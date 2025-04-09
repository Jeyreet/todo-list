import { MenuLink } from '../MenuLink/MenuLink'

import classes from './MenuLinkList.module.css'

export const MenuLinkList = () => {
  const links = [
    {label: 'Главная', to: '/home', focus: true},
    {label: 'Задачи', to: '/tasks'},
    {label: 'Бюджет', to: '/budget'},
    {label: 'Счета', to: '/wallets'},
    {label: 'Настройки', to: '/settings'},
  ]

  return (
    <nav className={classes.MenuLinkList}>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <MenuLink to={link.to} autoFocus={link.focus}>{link.label}</MenuLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}