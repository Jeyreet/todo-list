import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../../../stores/useLS'
import { Button } from '../../../../../controls/buttons/Button'
import { AreaInput } from '../../../../../controls/inputs/AreaInput'
import { DateInput } from '../../../../../controls/inputs/DateInput'
import { Input } from '../../../../../controls/inputs/Input'
import { Actions } from '../../../../../ui/Actions'
import { Gap } from '../../../../../ui/Gap'
import { Popup } from '../../../../../ui/Popup'
import { Title } from '../../../../../ui/Title'
import c from './Modify.module.scss'

dayjs.extend(customParseFormat)

export const Modify = ({ id, controls }) => {
  const task = LSControls.getTask(id)
  const modifyTask = LSControls.modifyTask

  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: task.name,
      desc: task.desc,
      start: dayjs(task.start, 'DD.MM.YYYY'),
      end: dayjs(task.end, 'DD.MM.YYYY')
    }
  })

  const handleModifyTask = data => {
    modifyTask(id, data)
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Изменить задачу</Title>
        <form onSubmit={handleSubmit(handleModifyTask)}>
          <Popup.Scroller>
            <Gap column>
              <Input
                label="Название"
                placeholder="Сделать..."
                name="name"
                rules={{ required: 'Обязательное' }}
                control={control}
                autoFocus
              />
              <AreaInput
                label="Описание"
                placeholder="И не забыть..."
                name="desc"
                control={control}
              />
              <DateInput label="Начало" name="start" control={control} />
              <DateInput label="Конец" name="end" control={control} />
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
