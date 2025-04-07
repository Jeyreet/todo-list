import clsx from 'clsx'
import classes from './Collapser.module.css'
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";

export const Collapser = forwardRef(({children, smoothAppear}, ref) => {
  const [closed, setClosed] = useState(smoothAppear)

  useEffect(() => {
    setTimeout(() => setClosed(false), 0)
  }, [])

  useImperativeHandle(ref, () => ({
    close: () => {
      setClosed(true)
    },
    open: () => {
      setClosed(false)
    }
  }))

  return (
    <div className={clsx(classes.Collapser, closed && classes.closed)}>
      <div className={classes.cell}>
        {children}
      </div>
    </div>
  )
})