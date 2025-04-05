import { useController } from 'react-hook-form'

import clsx from 'clsx'
import inputClasses from '../Input.module.css'
import classes from './TextInput.module.css'

export const TextInput = ({name, control, rules, label, type = 'text', placeholder = '', autoFocus}) => {
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
      <input
        className={clsx(inputClasses.input, classes.input)}
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ''}
        name={name}
        ref={ref}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </label>
  )
}