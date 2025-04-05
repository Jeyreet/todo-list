import { createPortal } from 'react-dom'

export const Portal = ({children}) => {
  const portalRoot = document.getElementById('portal')
  return createPortal(children, portalRoot)
}