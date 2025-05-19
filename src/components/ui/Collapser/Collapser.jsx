import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import c from './Collapser.module.scss'

export const Collapser = ({ className, cs = {}, children }) => {
  return (
    <div className={clsx(c.Collapser, className)}>
      <div className={clsx(c.wrapper, cs.wrapper)}>
        <div className={cs.inner}>{children}</div>
      </div>
    </div>
  )
}
