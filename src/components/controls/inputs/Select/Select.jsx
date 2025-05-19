import { memo, useEffect, useRef } from 'react'
import { useController } from 'react-hook-form'

import Chevron from '../../../../assets/icons/chevron.svg'
import { usePopup } from '../../../../hooks/usePopup'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Button } from '../../buttons/Button'
import { Header } from '../Header'
import c from './Select.module.scss'

export const Select = memo(({ label, name, rules, options = [], control }) => {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, rules, control })

  const oldOptions = useRef(options)

  useEffect(() => {
    onChange(
      (
        options?.find(option => option.value === value) ??
        options?.find(option => option.default) ??
        options?.[0]
      )?.value
    )
  }, [])

  useEffect(() => {
    if (JSON.stringify(oldOptions.current) !== JSON.stringify(options)) {
      oldOptions.current = options
      onChange((options?.find(option => option.default) ?? options?.[0])?.value)
    }
  }, [onChange, options, value])

  const controls = usePopup()

  return (
    <label>
      <Header label={label} error={error} />
      <Button
        className={c.button}
        cs={{ inner: c.inner }}
        onClick={controls.open}
      >
        <span>{options?.find(option => option.value === value)?.label}</span>
        <Chevron className={c.chevron} />
      </Button>
      <Popup controls={controls}>
        <Gap column>
          {options &&
            options.map(option => (
              <Button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  controls.close()
                }}
              >
                {option.label}
              </Button>
            ))}
        </Gap>
      </Popup>
    </label>
  )
})
