import clsx from 'clsx'

import c from './Title.module.scss'

export const Title = ({
  center = false,
  indent = false,
  className,
  children
}) => {
  return (
    <p
      className={clsx(
        c.Title,
        center && c.center,
        indent && c.indent,
        className
      )}
    >
      {children}
    </p>
  )
}
