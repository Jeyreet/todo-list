import { InputGroup } from './InputGroup/InputGroup'
import { Calendar } from './Calendar/Calendar'
import inputClasses from '../Input.module.css'
import {useController} from "react-hook-form";
import {DateInputProvider} from "./DateInputContext.jsx";
import {ErrorGroup} from "./ErrorGroup/ErrorGroup.jsx";
import dayjs from 'dayjs'

export const DateInput = ({name, control, rules, label, autoFocus}) => {
  const {
    field: {onChange, onBlur, value, ref},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue: dayjs().format('YYYY-MM-DD'),
  })

  return (
    <label className={inputClasses.Input}>
      <DateInputProvider
        label={label}
        autoFocus={autoFocus}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
        error={error}
      >
        <ErrorGroup />
        <InputGroup />
        <Calendar />
      </DateInputProvider>
    </label>
  )
}