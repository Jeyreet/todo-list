import { useForm } from 'react-hook-form'

import Arrow from '../../../../assets/icons/arrow.svg'
import Trashcan from '../../../../assets/icons/trashcan.svg'
import { usePopup } from '../../../../hooks/usePopup'
import { LSControls } from '../../../../stores/useLS'
import { Button } from '../../../controls/buttons/Button'
import { IconButton } from '../../../controls/buttons/IconButton'
import { AreaInput } from '../../../controls/inputs/AreaInput'
import { Actions } from '../../../ui/Actions'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Title } from '../../../ui/Title'
import c from './Store.module.scss'

export const Store = () => {
  const controls = usePopup()
  const { control, getValues, setValue } = useForm()

  const importStore = () => LSControls.import(getValues('store'))

  const exportStore = () => {
    const serializedStore = LSControls.export()

    setValue('store', serializedStore)
    navigator.clipboard.writeText(serializedStore)
  }

  return (
    <>
      <Title indent>Хранилище</Title>
      <AreaInput
        label="Импорт и экспорт"
        placeholder="Ваши данные..."
        name="store"
        control={control}
      />
      <Gap className={c.gap}>
        <IconButton
          className={c.storeButton}
          cs={{ icon: c.importIcon }}
          icon={Arrow}
          label="Импорт"
          onClick={importStore}
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
