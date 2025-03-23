import classes from './MenuLinkList.module.css'
import { MenuLink } from '../MenuLink/MenuLink'

export const MenuLinkList = () => {
  const links = [
    {label: 'Главная', to: '/home', focus: true},
    {label: 'Задачи', to: '/tasks'},
    {label: 'Бюджет', to: '/budget'},
    {label: 'Настройки', to: '/settings'},
  ]

  return (
    <nav className={classes.MenuLinkList}>
      <ul className={classes.list}>
        {links.map((link) => (
          <li className={classes.item} key={link.to}>
            <MenuLink to={link.to} autoFocus={link.focus}>{link.label}</MenuLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}