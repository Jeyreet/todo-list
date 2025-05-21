import { useLayoutEffect } from 'react'

import { useUI } from '../../../stores/useUI'
import { Collapser } from '../../ui/Collapser'
import c from './Operations.module.scss'

export const Operations = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Операции'))

  return <Collapser>Операции</Collapser>
}
