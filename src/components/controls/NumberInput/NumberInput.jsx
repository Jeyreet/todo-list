import { useController } from 'react-hook-form'

import clsx from 'clsx'
import inputClasses from '../Input.module.css'
import classes from './NumberInput.module.css'
import {useEffect, useRef, useState} from "react";

export const NumberInput = ({name, control, rules, label, autoFocus, precision = 0}) => {
  const {
    field: {onChange, onBlur, value},
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue: 0
  })

  const split = (number, n) => {
    const str = number.toString()
    const len = str.length;

    const firstPart = str.slice(0, len - n)
    const lastPart = str.slice(-n)

    return [firstPart, lastPart === '0' || lastPart === '00' ? '' : lastPart]
  }

  const [integerValue, setIntegerValue] = useState(() => split(value, precision)[0])
  const [fractionValue, setFractionValue] = useState(() => split(value, precision)[1])

  const integerRef = useRef(null)
  const fractionRef = useRef(null)

  const handleIntegerChange = e => {
    let val = e.target.value.replace(',', '.')

    if (val.includes('.')) {
      fractionRef.current.focus()
      fractionRef.current.setSelectionRange(0, 0)
    }

    val = val
      .replace(/^(-?)0*(\d+)/, '$1$2')
      .replace(/[^\d.-]/g, '')
      .replace(/(?!^)-/g, '')
      .split('.')[0]

    if (/^0+$/.test(val))
      val = ''

    setIntegerValue(val)
  }

  const handleFractionChange = (e) => {
    let val = e.target.value.replace(/\D/g, '')

    if (val.length > precision)
      val = val.slice(0, precision)

    if (val.length)
      val = val.padStart('0', precision)

    setFractionValue(val)
  }

  const handleIntegerBlur = e => {
    if (/^0+$/.test(e.target.value))
      e.target.value = ''

    if (document.activeElement !== fractionRef.current) onBlur()
  }

  const handleFractionBlur = e => {
    if (/^0+$/.test(e.target.value))
      e.target.value = ''
    else if (e.target.value)
      e.target.value = e.target.value.padEnd(precision, '0')

    if (document.activeElement !== integerRef.current) onBlur()
  }

  const handleIntegerKeyDown = e => {
    if (
      (e.key === 'Delete' || e.key === 'ArrowRight') &&
      e.target.selectionStart === e.target.value.length &&
      e.target.selectionEnd === e.target.value.length
    ) {
      if (e.key === 'Delete')
        setFractionValue(prev => prev.slice(1))

      setTimeout(() => {
        fractionRef.current.focus()
        fractionRef.current.setSelectionRange(0, 0)
      }, 0)
    }
  }

  const handleFractionKeyDown = e => {
    if (
      (e.key === 'Backspace' || e.key === 'ArrowLeft') &&
      e.target.selectionStart === 0 &&
      e.target.selectionEnd === 0
    ) {
      if (e.key === 'Backspace')
        setIntegerValue(prev => prev.slice(0, -1))

      setTimeout(() => {
        integerRef.current.focus()
        integerRef.current.setSelectionRange(integerValue.length, integerValue.length)
      }, 0)
    }

  }

  useEffect(() => {
    onChange(Number(`${integerValue || ''}${fractionValue.padEnd(precision, '0')}`))
  }, [integerValue, fractionValue])

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
      <div className={classes.inputs}>
        <input
          type="text"
          inputMode="decimal"
          className={clsx(inputClasses.input, classes.input)}
          onChange={handleIntegerChange}
          onBlur={handleIntegerBlur}
          onKeyDown={handleIntegerKeyDown}
          value={integerValue}
          placeholder={'0'}
          autoFocus={autoFocus}
          ref={integerRef}
        />
        <input
          type="text"
          inputMode="decimal"
          className={clsx(inputClasses.input, classes.input)}
          onChange={handleFractionChange}
          onBlur={handleFractionBlur}
          onKeyDown={handleFractionKeyDown}
          value={fractionValue}
          placeholder={'0'.repeat(precision)}
          ref={fractionRef}
          style={{
            '--precision': precision,
            display: precision === 0 ? 'none' : 'block',
          }}
        />
      </div>
    </label>
  )
}