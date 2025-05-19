import { memo, useEffect, useReducer, useState } from 'react'
import { useController } from 'react-hook-form'

import { makePrecision } from '../../../../utils/precision'
import { Header } from '../Header'
import c from './NumberInput.module.scss'

export const NumberInput = memo(
  ({ label, name, rules, control, precision = 0, autoFocus, cs = {} }) => {
    const {
      field: { onChange, onBlur, value, ref },
      fieldState: { error }
    } = useController({ name, rules, control })

    const [displayValue, setDisplayValue] = useState('')

    useEffect(() => {
      if (!Number.isInteger(value)) onChange(0)
    }, [])

    useEffect(() => {
      if (!Number.isInteger(value)) return
      setDisplayValue(makePrecision(value, precision).replaceAll(' ', ''))
    }, [precision, value])

    const handleChange = e => {
      const input = e.target
      const value = input.value
      const clearValue = value
        .replace(/[^\d.,-]/g, '')
        .replace('.', ',')
        .replace(/(?!^)-/g, '')
      let caretPos = input.selectionStart
      const commaAt = clearValue.indexOf(',')
      const separatedAt = commaAt === -1 ? caretPos : commaAt
      const numberValue = clearValue.replaceAll(',', '')
      const valueRegExp = new RegExp(`^(.{${separatedAt}})(.*)$`)
      const valueMatch = numberValue.match(valueRegExp)
      const integer = (precision === 0 ? numberValue : valueMatch?.[1]) || '0'
      const float = (valueMatch?.[2] || '0')
        .substring(0, precision)
        .padEnd(precision, '0')
      const newValue = parseInt(integer + float)

      const isInsert = e.nativeEvent.inputType === 'insertText'
      const charMatch = new RegExp(`(.{${caretPos - 1}})(.)(.*)`)
      const char = value.match(charMatch)?.[2]

      if (isInsert && /[^\d,]/.test(char)) caretPos--
      if (isInsert && /-/.test(char) && caretPos === 0) caretPos++

      onChange(newValue)

      requestAnimationFrame(() =>
        setTimeout(() => input.setSelectionRange(caretPos, caretPos), 0)
      )
    }

    return (
      <label>
        <Header className={cs.header} label={label} error={error} />
        <input
          className={c.input}
          onChange={handleChange}
          onBlur={onBlur}
          value={displayValue}
          ref={ref}
          type="text"
          autoFocus={autoFocus}
        />
      </label>
    )
  }
)
