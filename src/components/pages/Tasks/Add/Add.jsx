import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../stores/useLS'
import { Button } from '../../../controls/buttons/Button'
import { AreaInput } from '../../../controls/inputs/AreaInput'
import { DateInput } from '../../../controls/inputs/DateInput'
import { Input } from '../../../controls/inputs/Input'
import { Actions } from '../../../ui/Actions'
import { Gap } from '../../../ui/Gap'
import { Popup } from '../../../ui/Popup'
import { Title } from '../../../ui/Title'
import c from './Add.module.scss'

dayjs.extend(customParseFormat)

export const Add = ({ controls }) => {
  const addTask = LSControls.addTask

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      desc: ''
    }
  })

  const handleAddTask = data => {
    addTask(data)
    reset()
    controls.close()
  }

  return (
    <Popup controls={controls} minWidth={300}>
      <Gap column>
        <Title>Добавить задачу</Title>
        <form onSubmit={handleSubmit(handleAddTask)}>
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
              Добавить
            </Button>
            <Button onClick={controls.close}>Отмена</Button>
          </Actions>
        </form>
      </Gap>
    </Popup>
  )
}
