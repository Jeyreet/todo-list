import { FixedPortal } from '../../App/FixedPortal'
import { Collapser } from '../Collapser'
import c from './PageTools.module.scss'

export const PageTools = ({ children }) => {
  return (
    <FixedPortal>
      <div className={c.PageTools}>{children}</div>
    </FixedPortal>
  )
}
