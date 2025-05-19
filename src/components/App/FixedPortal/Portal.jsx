import { useUI } from '../../../stores/useUI'
import { DelayedUnmount } from '../../ui/DelayedUnmount'

export const Portal = () => {
  const isMenuOpened = useUI(state => state.isMenuOpened)
  const isPopupOpened = useUI(state => state.isPopupOpened)

  return (
    <DelayedUnmount
      inert={isMenuOpened || isPopupOpened}
      timeout={300}
      component="div"
      componentProps={{ id: 'fixed-ui' }}
    />
  )
}
