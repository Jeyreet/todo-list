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
import { Radio } from '../../../controls/inputs/Radio'

export const Add = ({ controls }) => {
  const addCategory = LSControls.addCategory

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

  const handleAddCategory = data => {
    addCategory(data)
    reset()
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Добавить категорию</Title>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <Popup.Scroller>
            <Gap column>
              <Input
                label="Название"
                placeholder="Продукты..."
                name="name"
                rules={{ required: 'Обязательное' }}
                control={control}
                autoFocus
              />
              <Radio
                label="Тип"
                name="type"
                options={[
                  { value: 'expense', label: 'Расходы' },
                  { value: 'income', label: 'Доходы' }
                ]}
                control={control}
              />
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
