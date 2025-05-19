import { memo } from 'react'
import { useController } from 'react-hook-form'

import { Gap } from '../../../ui/Gap'
import { Header } from '../../inputs/Header'
import c from './Switch.module.scss'

export const Switch = memo(
  ({ label, name = '', rules, control, autoFocus }) => {
    const {
      field: { onChange, onBlur, value, ref },
      fieldState: { error }
    } = useController({ name, rules, control })

    return (
      <label className={c.Switch}>
        <Gap className={c.gap}>
          <Header className={c.header} label={label} error={error} />
          <div className={c.track}>
            <div className={c.thumb} />
          </div>
          <input
            className="visually-hidden"
            onChange={onChange}
            onBlur={onBlur}
            checked={value}
            ref={ref}
            type="checkbox"
            autoFocus={autoFocus}
          />
        </Gap>
      </label>
    )
  }
)
