import clsx from 'clsx'
import classes from './Title.module.css'

export const Title = ({className, children}) => {
  return (
    <h3 className={clsx(classes.Title, className)}>{children}</h3>
  )
}