import { createPortal } from 'react-dom'

export const FixedPortal = ({ children }) => {
  const portalRoot = document.getElementById('fixed-ui')
  return createPortal(children, portalRoot)
}
