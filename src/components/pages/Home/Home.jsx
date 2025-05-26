import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useLayoutEffect } from 'react'

import { useUI } from '../../../stores/useUI'
import { Collapser } from '../../ui/Collapser'
import c from './Home.module.scss'
import { Tasks } from './Tasks'
import { Wallets } from './Wallets'

dayjs.extend(customParseFormat)

export const Home = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Главная'))

  return (
    <Collapser>
      <Tasks />
      <Wallets />
    </Collapser>
  )
}
