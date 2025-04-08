import { useController } from 'react-hook-form'

import clsx from 'clsx'
import classes from './AreaInput.module.css'
import inputClasses from '../Input.module.css'

export const AreaInput = ({className, name, control, rules, label, placeholder = '', autoFocus}) => {
  const {
    field: {onChange, onBlur, value, ref},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  })

  return (
    <label className={inputClasses.Input}>
      <div className={inputClasses.name}>
        <span>
          {label}
        </span>
        <span>
          {error?.message && ` (${error.message})`}
        </span>
      </div>
      <textarea
        className={clsx(inputClasses.input, classes.textarea, className)}
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ''}
        name={name}
        ref={ref}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </label>
  )
}