import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../../../stores/useLS'
import { Button } from '../../../../../controls/buttons/Button'
import { Switch } from '../../../../../controls/buttons/Switch'
import { Actions } from '../../../../../ui/Actions'
import { Gap } from '../../../../../ui/Gap'
import { Popup } from '../../../../../ui/Popup'
import { Title } from '../../../../../ui/Title'
import c from './Remove.module.scss'

export const Remove = ({ id, controls }) => {
  const task = LSControls.getTask(id)
  const removeTask = LSControls.removeTask
  const disableTaskRemoveConfirmation = LSControls.disableTaskRemoveConfirmation
  const { control, getValues } = useForm()

  const handleRemoveTask = () => {
    if (getValues('disableTaskRemoveConfirmation'))
      disableTaskRemoveConfirmation()

    removeTask(id)
    controls.close()
  }

  return (
    <Popup controls={controls} maxWidth={340}>
      <Gap column>
        <Title>Удаление задачи</Title>
        <p>Вы действительно хотите удалить задачу "{task.name}"?</p>
        <Switch
          label="Не спрашивать снова"
          name="disableTaskRemoveConfirmation"
          control={control}
          autoFocus
        />
        <Actions>
          <Button onClick={handleRemoveTask}>Удалить</Button>
          <Button onClick={controls.close}>Отмена</Button>
        </Actions>
      </Gap>
    </Popup>
  )
}
