import { DelayedUnmount } from '../../ui/DelayedUnmount'

export const Portal = () => {
  return (
    <DelayedUnmount
      timeout={200}
      component="div"
      componentProps={{ id: 'popup-ui' }}
    />
  )
}
