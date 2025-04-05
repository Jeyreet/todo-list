import { Header } from './Header/Header'
import { Content } from './Content/Content.jsx'

import { useGlobalStore } from '../../../hooks/useGlobalStore'

import classes from './Body.module.css'

export const Body = () => {
  const isMenuOpen = useGlobalStore(state => state.isMenuOpen)
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const isScreenWide = useGlobalStore(state => state.isScreenWide)

  return (
    <div className={classes.Content} inert={(isMenuOpen && !isScreenWide) || isModalOpen}>
      <Header />
      <Content />
    </div>
  )
}