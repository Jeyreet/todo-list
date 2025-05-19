import clsx from 'clsx'
import { memo } from 'react'

import { Gap } from '../../../ui/Gap'
import { Button } from '../Button'
import c from './IconButton.module.scss'

export const IconButton = memo(
  ({ icon: Icon, label, cs = {}, className, ...props }) => {
    return (
      <Button
        className={className}
        cs={{ inner: clsx(c.inner, cs.inner) }}
        {...props}
      >
        <Gap className={c.gap}>
          <Icon className={clsx(c.icon, cs.icon)} />
          {label && <p>{label}</p>}
        </Gap>
      </Button>
    )
  }
)
