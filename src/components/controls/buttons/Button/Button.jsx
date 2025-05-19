import clsx from 'clsx'
import { memo, useCallback, useState } from 'react'

import { Loader } from '../../../ui/Loader'
import c from './Button.module.scss'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'

export const Button = memo(
  ({
    onClick = () => {},
    disabled,
    visualDisabled = disabled,
    type = 'button',
    className,
    cs = {},
    children,
    ...props
  }) => {
    const [loading, setLoading] = useState(false)

    const handleClick = useCallback(async () => {
      if (!loading && !disabled) {
        setLoading(true)
        await onClick()
        setLoading(false)
      }
    }, [loading, disabled, setLoading, onClick])

    return (
      <button
        className={clsx(
          c.Button,
          className,
          loading && c.loading,
          visualDisabled && c.disabled
        )}
        onClick={handleClick}
        disabled={disabled}
        type={type}
        {...props}
      >
        <div className={clsx(c.inner, cs.inner)}>{children}</div>
        <DelayedUnmount>{loading && <Loader />}</DelayedUnmount>
      </button>
    )
  }
)
