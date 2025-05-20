import { useRef } from 'react'
import { useController } from 'react-hook-form'

import { Gap } from '../../../ui/Gap'
import { Header } from '../Header'
import c from './ColorInput.module.scss'

const calculateValue = value => (value < 0 ? 0 : value > 100 ? 100 : value)

export const ColorInput = ({
  label,
  name,
  placeholder,
  rules,
  control,
  autoFocus
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({ name, rules, control })

  const linePaddingRef = useRef(null)

  const handleChange = e => {
    const input = e.target
    const value = Number(input.value.replace(/\D/, ''))

    onChange(calculateValue(value))
  }

  const handleStart = e => {
    e.preventDefault()

    const isTouch = e.type === 'touchstart'
    const rect = linePaddingRef.current.getBoundingClientRect()

    const handleMove = evt => {
      const clientX = isTouch ? evt.touches[0].clientX : evt.clientX
      const relative = ((clientX - rect.left) / rect.width) * 100
      onChange(calculateValue(Math.round(relative)))
    }

    handleMove(e)

    const handleEnd = () => {
      if (isTouch) {
        document.removeEventListener('touchmove', handleMove)
        document.removeEventListener('touchend', handleEnd)
      } else {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleEnd)
      }
    }

    if (isTouch) {
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('touchend', handleEnd)
    } else {
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleEnd)
    }
  }

  return (
    <label>
      <Header label={label} error={error} />
      <Gap>
        <div
          className={c.line}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <div className={c.linePadding} ref={linePaddingRef}>
            <div className={c.selectorPosition} style={{ left: `${value}%` }}>
              <div className={c.selectorWrapper}>
                <div className={c.selector} />
              </div>
            </div>
          </div>
        </div>
        <input
          className={c.input}
          onChange={handleChange}
          onBlur={onBlur}
          value={value ?? ''}
          ref={ref}
          placeholder={placeholder}
          type="text"
          autoFocus={autoFocus}
        />
      </Gap>
    </label>
  )
}
