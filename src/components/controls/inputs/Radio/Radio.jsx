import clsx from 'clsx'
import { memo, useEffect, useRef } from 'react'
import { useController } from 'react-hook-form'

import { usePopup } from '../../../../hooks/usePopup'
import { Gap } from '../../../ui/Gap'
import { Button } from '../../buttons/Button'
import { Header } from '../Header'
import c from './Radio.module.scss'

export const Radio = memo(({ label, name, rules, options = [], control }) => {
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
    <div>
      <Header label={label} error={error} />
      <Gap column>
        {options &&
          options.map(option => (
            <Button
              key={option.value}
              cs={{
                inner: clsx(c.inner)
              }}
              onClick={() => {
                onChange(option.value)
                controls.close()
              }}
            >
              <div
                className={clsx(c.circle, value === option.value && c.chosen)}
              ></div>
              {option.label}
            </Button>
          ))}
      </Gap>
    </div>
  )
})
