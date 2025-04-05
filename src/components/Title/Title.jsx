import classes from './Title.module.css'

export const Title = ({children}) => {
  return (
    <h3 className={classes.Title}>{children}</h3>
  )
}