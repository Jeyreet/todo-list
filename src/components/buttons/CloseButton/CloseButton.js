import { Button } from '../Button/Button'
import classes from './CloseButton.module.css';

export const CloseButton = ({onClick}) => {
  return (
    <Button className={classes.CloseButton} onClick={onClick}>
      <span className={classes.line} />
      <span className={classes.line} />
    </Button>
  )
}