import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../stores/useLS'
import { debounce } from '../../../../utils/debounce'
import { Switch } from '../../../controls/buttons/Switch'
import { ColorInput } from '../../../controls/inputs/ColorInput'
import { Radio } from '../../../controls/inputs/Radio'
import { Gap } from '../../../ui/Gap'
import { Title } from '../../../ui/Title'
import c from './Visuals.module.scss'

export const Visuals = () => {
  const { control, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      themeMainColor: LSControls.getThemeMainColor(),
      borderRadius: LSControls.getBorderRadius(),
      theme: LSControls.getTheme(),
      gap: LSControls.getGap()
    }
  })

  const themeMainColor = watch('themeMainColor')
  const borderRadius = watch('borderRadius')
  const theme = watch('theme')
  const gap = watch('gap')

  let themeMainColorDebounce = useRef(null)

  useEffect(() => {
    themeMainColorDebounce.current = debounce(
      themeMainColorDebounce.current,
      () => LSControls.setThemeMainColor(themeMainColor),
      200
    )
  }, [themeMainColor])

  useEffect(() => {
    if (borderRadius) LSControls.enableBorderRadius()
    else LSControls.disableBorderRadius()
  }, [borderRadius])

  useEffect(() => {
    if (theme === 'system') LSControls.clearTheme()
    else if (theme === 'light') LSControls.setLightTheme()
    else if (theme === 'dark') LSControls.setDarkTheme()
  }, [theme])

  useEffect(() => {
    if (gap === 'small') LSControls.setSmallGap()
    else if (gap === 'big') LSControls.setBigGap()
    else if (gap === 'standard') LSControls.setStandardGap()
  }, [gap])

  return (
    <>
      <Title indent>Визуальное оформление</Title>
      <ColorInput
        name="themeMainColor"
        label="Основной цвет"
        control={control}
      />
      <Switch name="borderRadius" label="Скругления углов" control={control} />
      <Gap className={c.gap}>
        <Radio
          name="theme"
          label="Тема"
          options={[
            { value: 'light', label: 'Светлая' },
            { value: 'dark', label: 'Темная' },
            { value: 'system', label: 'Как в системе' }
          ]}
          control={control}
        />
        <Radio
          name="gap"
          label="Отступы"
          options={[
            { value: 'small', label: 'Маленькие' },
            { value: 'standard', label: 'Стандартные' },
            { value: 'big', label: 'Большие' }
          ]}
          control={control}
        />
      </Gap>
    </>
  )
}
