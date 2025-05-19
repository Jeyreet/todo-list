import { createPortal } from 'react-dom'

export const PopupPortal = ({ children }) => {
  const portalRoot = document.getElementById('popup-ui')
  return createPortal(children, portalRoot)
}
