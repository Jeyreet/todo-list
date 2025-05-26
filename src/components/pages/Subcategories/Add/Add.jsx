import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../stores/useLS'
import { Button } from '../../../controls/buttons/Button'
import { Input } from '../../../controls/inputs/Input'
import { Actions } from '../../../ui/Actions'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Title } from '../../../ui/Title'
import c from './Add.module.scss'

export const Add = ({ id, controls }) => {
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
    addCategory({ ...data, parent: id })
    reset()
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Добавить подкатегорию</Title>
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
