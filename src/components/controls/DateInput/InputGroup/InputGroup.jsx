import { Button } from '../../Button/Button'

import { useDateInput } from '../DateInputContext'

import clsx from 'clsx'
import classes from './InputGroup.module.css'
import inputClasses from '../../Input.module.css'

export const InputGroup = () => {
  const {
    onChange,
    onBlur,
    value,
    name,
    ref,
    autoFocus,
    toggle,
    inputGroupRef,
  } = useDateInput()

  return (
    <div className={classes.InputGroup} ref={inputGroupRef}>
      <input
        className={clsx(inputClasses.input, classes.input)}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        ref={ref}
        type="date"
        autoFocus={autoFocus}
        onClick={e => e.preventDefault()}
      />
      <Button
        onClick={toggle}
        tabIndex="-1"
      >
        К
      </Button>
    </div>
  )
}