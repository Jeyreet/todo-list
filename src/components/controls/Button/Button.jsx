import { Loader } from '../../Loader/Loader.jsx'

import { useState } from 'react'

import clsx from 'clsx'
import classes from './Button.module.css'

export const Button = ({disabled, visualDisabled = disabled, secondary = false, type = 'button', children, className, onClick = () => {}, ...props}) => {
  const [loading, setLoading] = useState(false)

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        classes.Button,
        visualDisabled && classes.disabled,
        secondary && classes.secondary,
        loading && classes.loading,
        className)}
      onClick={async () => {
        if (!loading && !disabled) {
          setLoading(true)
          await onClick()
          setLoading(false)
        }
      }}
      {...props}
    >
      <div className={classes.inner}>
        <div className={classes.content}>
          {children}
        </div>
        <Loader visible={loading}/>
      </div>
    </button>
  )
}