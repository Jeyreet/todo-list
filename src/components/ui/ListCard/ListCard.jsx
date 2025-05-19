import clsx from 'clsx'

import c from './ListCard.module.scss'

export const ListCard = ({
  tag: Tag = 'li',
  children,
  className,
  ...props
}) => {
  return <Tag className={clsx(c.ListCard, className)}>{children}</Tag>
}
