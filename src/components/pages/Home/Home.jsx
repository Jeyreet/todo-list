import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useLayoutEffect, useMemo } from 'react'

import { useLS } from '../../../stores/useLS'
import { useUI } from '../../../stores/useUI'
import { pluralize } from '../../../utils/pluralize'
import { Collapser } from '../../ui/Collapser'
import { Title } from '../../ui/Title'
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
