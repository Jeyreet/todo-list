import { useController } from 'react-hook-form'

import clsx from 'clsx'
import inputClasses from '../Input.module.css'
import classes from './Switch.module.css'

export const Switch = ({name, control, rules, label, autoFocus}) => {
  const {
    field: {onChange, onBlur, value, ref},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue: false
  })

  return (
    <label className={clsx(classes.Switch, inputClasses.Input)}>
      <input
        className="visually-hidden"
        type="checkbox"
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        autoFocus={autoFocus}
      />
      <div className={clsx(classes.name, inputClasses.name)}>
        <span>
          {label}
        </span>
        <span>
          {error?.message && ` (${error.message})`}
        </span>
      </div>
      <div className={classes.checkbox}>
        <div className={classes.thumb} />
      </div>
    </label>
  )
}