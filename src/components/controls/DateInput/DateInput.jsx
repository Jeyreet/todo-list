import { InputGroup } from './InputGroup/InputGroup'
import { Calendar } from './Calendar/Calendar'
import inputClasses from '../Input.module.css'
import {useController} from "react-hook-form";
import {DateInputProvider} from './DateInputContext'
import {ErrorGroup} from './ErrorGroup/ErrorGroup'
import dayjs from 'dayjs'
import {useEffect} from "react";

export const DateInput = ({name, control, rules, label, autoFocus}) => {
  const {
    field: {onChange, onBlur, value, ref},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
  })

  return (
    <DateInputProvider
      label={label}
      autoFocus={autoFocus}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
      error={error}
    >
      <label className={inputClasses.Input}>
        <ErrorGroup />
        <InputGroup />
        <Calendar />
      </label>
    </DateInputProvider>
  )
}