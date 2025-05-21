import clsx from 'clsx'
import { useEffect, useRef } from 'react'

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
  const popupRef = useRef(null)

  useEffect(() => {
    if (popupRef.current) popupRef.current.close = controls.close
  }, [popupRef.current])

  return (
    <PopupPortal>
      {controls.isOpened && (
        <div
          className={clsx(c.Popup, className, background && c.background)}
          onMouseDown={controls.close}
          ref={popupRef}
        >
          <div
            className={clsx(c.inner, cs.inner)}
            ref={controls.ref}
            onMouseDown={e => e.stopPropagation()}
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
