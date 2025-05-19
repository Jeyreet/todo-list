import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../../../stores/useLS'
import { Button } from '../../../../../controls/buttons/Button'
import { Switch } from '../../../../../controls/buttons/Switch'
import { AreaInput } from '../../../../../controls/inputs/AreaInput'
import { DateInput } from '../../../../../controls/inputs/DateInput'
import { Input } from '../../../../../controls/inputs/Input'
import { NumberInput } from '../../../../../controls/inputs/NumberInput'
import { Actions } from '../../../../../ui/Actions'
import { Gap } from '../../../../../ui/Gap'
import { Popup } from '../../../../../ui/Popup'
import { Title } from '../../../../../ui/Title'
import c from './Modify.module.scss'

dayjs.extend(customParseFormat)

export const Modify = ({ id, controls }) => {
  const wallet = LSControls.getWallet(id)
  const modifyWallet = LSControls.modifyWallet

  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: wallet.name,
      balance: wallet.balance,
      main: wallet.main
    }
  })

  const handleModifyWallet = data => {
    modifyWallet(id, data)
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Изменить счет</Title>
        <form onSubmit={handleSubmit(handleModifyWallet)}>
          <Popup.Scroller>
            <Gap column>
              <Input
                label="Название"
                placeholder="Наличные..."
                name="name"
                rules={{ required: 'Обязательное' }}
                control={control}
                autoFocus
              />
              <NumberInput
                label="Баланс"
                name="balance"
                precision={2}
                control={control}
              />
              <Switch label="Сделать основным" name="main" control={control} />
            </Gap>
          </Popup.Scroller>
          <Actions>
            <Button type="submit" visualDisabled={!isValid}>
              Сохранить
            </Button>
            <Button onClick={controls.close}>Отмена</Button>
          </Actions>
        </form>
      </Gap>
    </Popup>
  )
}
