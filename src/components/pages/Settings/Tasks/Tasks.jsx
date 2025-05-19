import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { LSControls } from '../../../../stores/useLS'
import { Switch } from '../../../controls/buttons/Switch'
import { Title } from '../../../ui/Title'
import c from './Tasks.module.scss'

export const Tasks = () => {
  const enableTaskRemoveConfirmation = LSControls.enableTaskRemoveConfirmation
  const disableTaskRemoveConfirmation = LSControls.disableTaskRemoveConfirmation
  const { control, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      tasksRemoveConfirmation: LSControls.getTaskRemoveConfirmation()
    }
  })

  const tasksRemoveConfirmation = watch('tasksRemoveConfirmation')

  useEffect(() => {
    if (tasksRemoveConfirmation) enableTaskRemoveConfirmation()
    else disableTaskRemoveConfirmation()
  }, [
    disableTaskRemoveConfirmation,
    enableTaskRemoveConfirmation,
    tasksRemoveConfirmation
  ])

  return (
    <>
      <Title>Задачи</Title>
      <Switch
        name="tasksRemoveConfirmation"
        label="Подтверждение удаления задачи"
        control={control}
      />
    </>
  )
}
