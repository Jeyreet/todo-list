import { useEffect, useState } from 'react'

import { Popup } from '../Popup'
import c from './ContextPopup.module.scss'

export const ContextPopup = ({ children, controls, ...props }) => {
  const [left, setLeft] = useState(null)
  const [top, setTop] = useState(null)
  const [xOrigin, setXOrigin] = useState(null)
  const [yOrigin, setYOrigin] = useState(null)

  useEffect(() => {
    if (!controls.ref.current) return

    const styles = window.getComputedStyle(controls.ref.current)
    const point = controls.point()
    const directX = window.innerWidth > point.x + parseInt(styles.width)
    const directY = window.innerHeight > point.y + parseInt(styles.height)

    setLeft(directX ? point.x : point.x - parseInt(styles.width))
    setTop(directY ? point.y : point.y - parseInt(styles.height))
    setXOrigin(directX ? '-5px' : 'calc(100% + 5px)')
    setYOrigin(directY ? '-5px' : 'calc(100% + 5px)')
  }, [controls, controls.point])

  return (
    <Popup
      cs={{ inner: c.inner }}
      innerStyle={{
        left,
        top,
        '--xOrigin': xOrigin,
        '--yOrigin': yOrigin
      }}
      background={false}
      controls={controls}
      {...props}
    >
      {children}
    </Popup>
  )
}
