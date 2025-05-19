import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../stores/useLS'
import { Button } from '../../../controls/buttons/Button'
import { Switch } from '../../../controls/buttons/Switch'
import { Input } from '../../../controls/inputs/Input'
import { NumberInput } from '../../../controls/inputs/NumberInput'
import { Actions } from '../../../ui/Actions'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Title } from '../../../ui/Title'
import c from './Add.module.scss'

export const Add = ({ controls }) => {
  const addWallet = LSControls.addWallet

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  })

  const handleAddWallet = data => {
    addWallet(data)
    reset()
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Добавить счет</Title>
        <form onSubmit={handleSubmit(handleAddWallet)}>
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
              Добавить
            </Button>
            <Button onClick={controls.close}>Отмена</Button>
          </Actions>
        </form>
      </Gap>
    </Popup>
  )
}
