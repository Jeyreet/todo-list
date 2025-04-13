import { Link } from '../Link/Link.jsx'

import classes from './LinkList.module.css'

export const LinkList = () => {
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
            <Link to={link.to} autoFocus={link.focus}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}