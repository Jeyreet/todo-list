import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Arrow from '../../../../assets/icons/arrow.svg'
import Trashcan from '../../../../assets/icons/trashcan.svg'
import { usePopup } from '../../../../hooks/usePopup'
import { LSControls } from '../../../../stores/useLS'
import { debounce } from '../../../../utils/debounce'
import { Button } from '../../../controls/buttons/Button'
import { IconButton } from '../../../controls/buttons/IconButton'
import { Switch } from '../../../controls/buttons/Switch'
import { AreaInput } from '../../../controls/inputs/AreaInput'
import { Actions } from '../../../ui/Actions'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Title } from '../../../ui/Title'
import c from './Store.module.scss'

export const Store = () => {
  const controls = usePopup()
  const { control, getValues, setValue, watch, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      settingsImportProtection: LSControls.getSettingsImportProtection()
    }
  })

  const settingsImportProtection = watch('settingsImportProtection')

  useEffect(() => {
    if (settingsImportProtection) LSControls.enableSettingsImportProtection()
    else LSControls.disableSettingsImportProtection()
  }, [settingsImportProtection])

  const importStore = () => LSControls.import(getValues('store'))

  const exportStore = () => {
    const serializedStore = LSControls.export()

    setValue('store', serializedStore)
    navigator.clipboard.writeText(serializedStore)
  }

  return (
    <>
      <Title indent>Хранилище</Title>
      <form onSubmit={handleSubmit(importStore)}>
        <AreaInput
          label="Импорт и экспорт"
          placeholder="Ваши данные..."
          name="store"
          rules={{ required: 'Заполните данные для импорта' }}
          control={control}
        />
        <Switch
          label="Предотвратить импортирование настроек"
          name="settingsImportProtection"
          control={control}
        />
        <Gap className={c.gap}>
          <IconButton
            className={c.storeButton}
            cs={{ icon: c.importIcon }}
            icon={Arrow}
            label="Импорт"
            type="submit"
          />
          <IconButton
            className={c.storeButton}
            cs={{ icon: c.exportIcon }}
            icon={Arrow}
            label="Экспорт"
            onClick={exportStore}
          />
          <IconButton
            className={c.storeButton}
            cs={{ inner: c.inner }}
            icon={Trashcan}
            label="Сброс"
            onClick={controls.open}
          />
        </Gap>
      </form>

      <Popup controls={controls} maxWidth={450}>
        <Gap column>
          <Title>Сброс</Title>
          <p>
            Вы уверены, что хотите полностью очистить хранилище? Это действие
            невозможно отменить!
          </p>
          <Actions>
            <Button
              cs={{ inner: c.inner }}
              onClick={() => {
                LSControls.reset()
                controls.close()
              }}
            >
              Подтвердить
            </Button>
            <Button onClick={controls.close}>Отменить сброс</Button>
          </Actions>
        </Gap>
      </Popup>
    </>
  )
}
