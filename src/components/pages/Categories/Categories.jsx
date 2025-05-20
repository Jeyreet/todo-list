import c from './Categories.module.scss'
import { useUI } from '../../../stores/useUI'
import { useLayoutEffect } from 'react'
import { Collapser } from '../../ui/Collapser'

export const Categories = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Категории'))

  return <Collapser>Категории</Collapser>
}
