import classes from './Button.module.css'
import { Loader } from '../../Loader/Loader'
import clsx from 'clsx'
import {useCallback, useState} from 'react'

export const Button = ({disabled, children, className, onClick}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    if (!loading && !disabled) {
      setLoading(true)
      await onClick()
      setLoading(false)
    }
  }, []);

  return (
    <button
      disabled={!!disabled}
      className={clsx(classes.Button, loading && classes.loading, className)}
      onClick={handleClick}
    >
      <div className={classes.inner}>
        <div className={classes.content}>
          {children}
        </div>
        <Loader visible={loading}/>
      </div>
      <div className={classes.disableReason}>
        {typeof disabled === 'string' && disabled}
      </div>
    </button>
  )
}