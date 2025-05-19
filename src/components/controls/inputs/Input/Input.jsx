import { memo } from 'react'
import { useController } from 'react-hook-form'

import { Header } from '../Header'
import c from './Input.module.scss'

export const Input = memo(
  ({ cs = {}, label, placeholder, name, rules, control, autoFocus }) => {
    const {
      field: { onChange, onBlur, value, ref },
      fieldState: { error }
    } = useController({ name, rules, control })

    return (
      <label>
        <Header className={cs.header} label={label} error={error} />
        <input
          className={c.input}
          onChange={onChange}
          onBlur={onBlur}
          value={value ?? ''}
          ref={ref}
          placeholder={placeholder}
          type="text"
          autoFocus={autoFocus}
        />
      </label>
    )
  }
)
