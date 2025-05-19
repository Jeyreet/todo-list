import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { Collapser } from '../../../ui/Collapser'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'
import c from './Header.module.scss'

export const Header = ({ className, label, error }) => {
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (error?.message) setErrorMessage(error?.message)
  }, [error])

  return (
    <div className={clsx(c.Header, className)}>
      <div>{label}</div>
      <DelayedUnmount>
        {error?.message && (
          <Collapser>
            <div className={c.error}>{errorMessage}</div>
          </Collapser>
        )}
      </DelayedUnmount>
    </div>
  )
}
