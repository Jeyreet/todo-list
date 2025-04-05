import {useDateInput} from '../DateInputContext'

import inputClasses from '../../Input.module.css'

export const ErrorGroup = () => {
  const {
    label,
    error
  } = useDateInput()

  return (
    <div className={inputClasses.name}>
      <span>
        {label}
      </span>
      <span>
        {error?.message && ` (${error.message})`}
      </span>
    </div>
  )
}