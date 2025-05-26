import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { LSControls, useLS } from '../../../../stores/useLS'
import { Button } from '../../../controls/buttons/Button'
import { AreaInput } from '../../../controls/inputs/AreaInput'
import { Input } from '../../../controls/inputs/Input'
import { NumberInput } from '../../../controls/inputs/NumberInput'
import { Select } from '../../../controls/inputs/Select'
import { Actions } from '../../../ui/Actions'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Title } from '../../../ui/Title'
import c from './Add.module.scss'

export const Add = ({ controls }) => {
  const addOperation = LSControls.addOperation
  const wallets = useLS(state => state.wallets)
  const walletsOptions = useMemo(
    () =>
      wallets.map(wallet => ({
        value: wallet.id,
        label: wallet.name,
        default: wallet.main
      })),
    [wallets]
  )

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  })

  const handleAddOperation = data => {
    console.log(data)
    return
    addOperation(data)
    reset()
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Добавить операцию</Title>
        <form onSubmit={handleSubmit(handleAddOperation)}>
          <Popup.Scroller>
            <Gap column>
              <Select
                label="Счет"
                name="wallet"
                options={walletsOptions}
                control={control}
              />
              <NumberInput
                label="Сумма"
                name="amount"
                precision={2}
                control={control}
              />
              <AreaInput label="Описание" name="desc" control={control} />
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
