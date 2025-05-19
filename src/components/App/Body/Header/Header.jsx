import { memo } from 'react'

import Burger from '../../../../assets/icons/burger.svg'
import { useUI } from '../../../../stores/useUI'
import { IconButton } from '../../../controls/buttons/IconButton'
import { Gap } from '../../../ui/Gap'
import { Title } from '../../../ui/Title'
import c from './Header.module.scss'

export const Header = memo(() => {
  const currentPageTitle = useUI(state => state.currentPageTitle)
  const openMenu = useUI(state => state.openMenu)

  return (
    <Gap className={c.Header}>
      <IconButton className={c.button} icon={Burger} onClick={openMenu} />
      <Title className={c.title}>{currentPageTitle}</Title>
    </Gap>
  )
})
