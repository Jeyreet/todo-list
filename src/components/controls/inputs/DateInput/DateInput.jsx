import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { memo, useEffect, useRef, useState } from 'react'
import { useController } from 'react-hook-form'

import { usePopup } from '../../../../hooks/usePopup'
import { mergeRefs } from '../../../../utils/mergeRefs'
import { Header } from '../Header'
import { Calendar } from './Calendar'
import { CalendarButton } from './CalendarButton'
import c from './DateInput.module.scss'

dayjs.extend(customParseFormat)

export const DateInput = memo(({ label, name, rules, control, autoFocus }) => {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error }
  } = useController({ name, rules, control })

  const dayRef = useRef(null)
  const monthRef = useRef(null)
  const yearRef = useRef(null)

  const [day, setDay] = useState(value?.isValid() ? value.format('DD') : '')
  const [month, setMonth] = useState(value?.isValid() ? value.format('MM') : '')
  const [year, setYear] = useState(value?.isValid() ? value.format('YYYY') : '')

  useEffect(() => {
    if (!value?.isValid()) onChange(dayjs(''))
  }, [])

  const handleChange = (e, maxValue, maxLength, setter, next) => {
    const input = e.currentTarget
    const isInsert = e.nativeEvent.inputType === 'insertText'
    const value = input.value
    let clearValue = value.replace(/\D/, '').substring(0, maxLength)
    let caretPos = input.selectionStart
    const charMatch = new RegExp(`(.{${caretPos - 1}})(.)(.*)`)
    const char = value.match(charMatch)?.[2]
    const isWrongChar = /\D/.test(char)

    if (isInsert && isWrongChar) caretPos--
    if (/[.,]/.test(char)) clearValue = clearValue.padStart(maxLength, '0')
    setter(clearValue)
    requestAnimationFrame(() => input.setSelectionRange(caretPos, caretPos))

    if (next && clearValue.length >= maxLength) {
      requestAnimationFrame(() => {
        next.focus()
        next.setSelectionRange(0, next.value.length)
      })
    }
  }

  const handleKeyDown = (e, left, leftSetter, right) => {
    const input = e.currentTarget
    const caretPos = input.selectionStart
    const noSelect = caretPos === input.selectionEnd
    const key = e.key

    if (noSelect) {
      if (
        left &&
        (key === 'ArrowLeft' || key === 'Backspace') &&
        caretPos === 0
      ) {
        if (key === 'Backspace') leftSetter(prev => prev.substring(-1))
        left.focus()
        const length = left.value.length
        requestAnimationFrame(() => left.setSelectionRange(length, length))
      } else if (
        right &&
        key === 'ArrowRight' &&
        caretPos === input.value.length
      ) {
        right.focus()
        requestAnimationFrame(() => right.setSelectionRange(0, 0))
      }
    }
  }

  const handleBlur = (e, maxValue, maxLength, setter) => {
    const input = e.currentTarget
    let value = input.value
    const number = Number(value)

    if (value === '') value = ''
    else if (Number.isNaN(number) || number < 1) value = '1'
    else if (number > maxValue) value = String(maxValue)

    value = value === '' ? value : value.padStart(maxLength, '0')
    setter(value)

    requestAnimationFrame(() => {
      const active = document.activeElement

      if (
        active !== dayRef.current &&
        active !== monthRef.current &&
        active !== yearRef.current
      ) {
        onBlur()
        setDate(day, month, year)
      }
    })
  }

  const setDate = (day, month, year) => {
    if (day !== '' || month !== '' || year !== '') {
      let _year = dayjs(year, ['YYYY', 'YY'])
      if (!_year.isValid()) _year = dayjs()
      _year = _year.format('YYYY')

      let _month = dayjs(month, ['M', 'MM'])
      if (!_month.isValid()) _month = dayjs()
      _month = _month.format('MM')

      let _day = dayjs(day, ['D', 'DD'])
      if (!_day.isValid()) _day = dayjs()
      _day = _day.format('DD')

      const date = dayjs(`${_day}.${_month}.${_year}`, ['D.M.Y', 'DD.MM.YYYY'])

      setDay(date.format('DD'))
      setMonth(date.format('MM'))
      setYear(date.format('YYYY'))

      onChange(date)
    } else {
      setDay('')
      setMonth('')
      setYear('')

      onChange(dayjs(''))
    }
  }

  const handleFocus = e => {
    const input = e.currentTarget
    let length = input.value.length

    requestAnimationFrame(() => input.setSelectionRange(0, length))
  }

  const calendarControls = usePopup()

  return (
    <label>
      <Header label={label} error={error} />
      <div className={c.inputs}>
        <input
          className={c.short}
          onFocus={handleFocus}
          onChange={e => handleChange(e, 31, 2, setDay, monthRef.current)}
          onBlur={e => handleBlur(e, 31, 2, setDay)}
          onKeyDown={e => handleKeyDown(e, null, null, monthRef.current)}
          value={day}
          ref={mergeRefs(dayRef, ref)}
          placeholder="д"
          type="text"
          inputMode="decimal"
          autoFocus={autoFocus}
        />
        <span>.</span>
        <input
          className={c.short}
          onFocus={handleFocus}
          onChange={e => handleChange(e, 12, 2, setMonth, yearRef.current)}
          onBlur={e => handleBlur(e, 12, 2, setMonth)}
          onKeyDown={e =>
            handleKeyDown(e, dayRef.current, setDay, yearRef.current)
          }
          value={month}
          ref={monthRef}
          placeholder="м"
          type="text"
          inputMode="decimal"
        />
        <span>.</span>
        <input
          className={c.long}
          onFocus={handleFocus}
          onChange={e => handleChange(e, 9999, 4, setYear)}
          onBlur={e => handleBlur(e, 9999, 4, setYear)}
          onKeyDown={e => handleKeyDown(e, monthRef.current, setMonth, null)}
          value={year}
          ref={yearRef}
          placeholder="г"
          type="text"
          inputMode="decimal"
        />
        <CalendarButton onClick={calendarControls.open} />
      </div>
      <Calendar
        controls={calendarControls}
        day={day}
        month={month}
        year={year}
        setDate={setDate}
      />
    </label>
  )
})
