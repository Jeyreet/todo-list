import { memo, useMemo } from 'react'

import Categories from '../../../../assets/icons/categories.svg'
import Gear from '../../../../assets/icons/gear.svg'
import Home from '../../../../assets/icons/home.svg'
import Rouble from '../../../../assets/icons/rouble.svg'
import Tasks from '../../../../assets/icons/tasks.svg'
import Wallets from '../../../../assets/icons/wallets.svg'
import { Scroller } from '../../../controls/Scroller'
import { Gap } from '../../../ui/Gap'
import { Link } from './Link'
import c from './Links.module.scss'

export const Links = memo(() => {
  const links = useMemo(
    () => [
      { label: 'Главная', icon: Home, url: '/home' },
      { label: 'Задачи', icon: Tasks, url: '/tasks' },
      { label: 'Операции', icon: Rouble, url: '/operations' },
      { label: 'Категории', icon: Categories, url: '/categories' },
      { label: 'Счета', icon: Wallets, url: '/wallets' },
      { label: 'Настройки', icon: Gear, url: '/settings' }
    ],
    []
  )

  return (
    <Scroller
      className={c.Links}
      cs={{ scroller: c.scroller, inner: c.inner }}
      innerTag="nav"
    >
      <Gap tag="ul" column>
        {links.map(({ label, icon, url }) => (
          <li key={url}>
            <Link icon={icon} url={url}>
              {label}
            </Link>
          </li>
        ))}
      </Gap>
    </Scroller>
  )
})
