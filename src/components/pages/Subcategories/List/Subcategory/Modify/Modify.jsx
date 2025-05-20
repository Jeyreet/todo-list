import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../../../stores/useLS'
import { Button } from '../../../../../controls/buttons/Button'
import { Input } from '../../../../../controls/inputs/Input'
import { Radio } from '../../../../../controls/inputs/Radio'
import { Actions } from '../../../../../ui/Actions'
import { Gap } from '../../../../../ui/Gap'
import { Popup } from '../../../../../ui/Popup'
import { Title } from '../../../../../ui/Title'
import c from './Modify.module.scss'

dayjs.extend(customParseFormat)

export const Modify = ({ id, controls }) => {
  const category = LSControls.getCategory(id)
  const modifyCategory = LSControls.modifyCategory

  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: category.name,
      type: category.type
    }
  })

  const handleModifyCategory = data => {
    modifyCategory(id, data)
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Изменить категорию</Title>
        <form onSubmit={handleSubmit(handleModifyCategory)}>
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
              Сохранить
            </Button>
            <Button onClick={controls.close}>Отмена</Button>
          </Actions>
        </form>
      </Gap>
    </Popup>
  )
}
