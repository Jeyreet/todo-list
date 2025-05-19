import { useLayoutEffect } from 'react'

import { useUI } from '../../../stores/useUI'
import { Collapser } from '../../ui/Collapser'
import { Gap } from '../../ui/Gap'
import c from './Settings.module.scss'
import { Store } from './Store'
import { Tasks } from './Tasks'
import { Visuals } from './Visuals'

export const Settings = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Настройки'))

  return (
    <Collapser>
      <Gap column className={c.Settings}>
        <Tasks />
        <Visuals />
        <Store />
      </Gap>
    </Collapser>
  )
}
