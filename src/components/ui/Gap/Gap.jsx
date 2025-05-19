import clsx from 'clsx'

import c from './Gap.module.scss'

export const Gap = ({
  column = false,
  tag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  return (
    <Tag className={clsx(c.Gap, column && c.column, className)} {...props}>
      {children}
    </Tag>
  )
}
