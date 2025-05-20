import clsx from 'clsx'

import { PopupPortal } from '../../App/PopupPortal'
import { Scroller } from '../../controls/Scroller'
import c from './Popup.module.scss'

export const Popup = ({
  background = true,
  children,
  controls,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  className,
  cs = {},
  innerStyle = {}
}) => {
  return (
    <PopupPortal>
      {controls.isOpened && (
        <div
          className={clsx(c.Popup, className, background && c.background)}
          onClick={controls.close}
        >
          <div
            className={clsx(c.inner, cs.inner)}
            ref={controls.ref}
            onClick={e => e.stopPropagation()}
            style={{
              '--minWidth': `${minWidth}px`,
              '--minHeight': `${minHeight}px`,
              '--maxWidth': maxWidth ? `${maxWidth}px` : '100%',
              '--maxHeight': maxHeight ? `${maxHeight}px` : '100%',
              ...innerStyle
            }}
          >
            {children}
          </div>
        </div>
      )}
    </PopupPortal>
  )
}

Popup.Scroller = ({ className, cs = {}, children }) => {
  return (
    <Scroller
      className={clsx(c.scroller, className)}
      cs={{ inner: clsx(c.scrollerInner, cs.inner) }}
    >
      {children}
    </Scroller>
  )
}
