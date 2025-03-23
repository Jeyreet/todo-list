import inputClasses from '../styles.module.css'
import classes from './TextInput.module.css'
import clsx from 'clsx'

export const TextInput = ({className, autoFocus, placeholder, error}) => {
  return (
    <label className={clsx(classes.TextInput, inputClasses.Input, className)}>
      <div>
        <span>{placeholder}</span>
        <span className={inputClasses.error}>{error && ` (${error})`}</span>
      </div>
      <input className={inputClasses.input} autoFocus={autoFocus} />
    </label>
  )
}