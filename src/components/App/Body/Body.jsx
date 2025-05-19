import { useUI } from '../../../stores/useUI'
import classes from './Body.module.scss'
import { Content } from './Content'
import { Header } from './Header'

export const Body = () => {
  const isMenuOpened = useUI(state => state.isMenuOpened)
  const isPopupOpened = useUI(state => state.isPopupOpened)

  return (
    <div className={classes.Body} inert={isMenuOpened || isPopupOpened}>
      <Header />
      <Content />
    </div>
  )
}
