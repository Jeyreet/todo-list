import { memo } from 'react'

import Arrow from '../../../../assets/icons/arrow.svg'
import { useUI } from '../../../../stores/useUI'
import { IconButton } from '../../../controls/buttons/IconButton'
import { Title } from '../../../ui/Title'
import c from './Header.module.scss'

export const Header = memo(() => {
  const closeMenu = useUI(state => state.closeMenu)

  return (
    <div className={c.Header}>
      <Title className={c.title}>Jeyreet Todo List</Title>
      <IconButton className={c.button} icon={Arrow} onClick={closeMenu} />
    </div>
  )
})
