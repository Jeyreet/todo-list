import { Button } from '../../../components/controls/Button/Button'
import { TextInput } from '../../../components/controls/TextInput/TextInput'
import { AreaInput } from '../../../components/controls/AreaInput/AreaInput'
import { DateInput } from '../../../components/controls/DateInput/DateInput'

import { useForm } from 'react-hook-form'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import modalClasses from '../../../components/App/Modal/Modal.module.css'
import {useEffect, useMemo} from "react";
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const ModifyTask = ({id}) => {
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const closeModal = useGlobalStore(state => state.closeModal)
  const modifyTask = useGlobalStore(state => state.modifyTask)
  const {name, desc, start, end} = useMemo(() => useGlobalStore.getState().getTask(id), [])

  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues: {name, desc, start, end}
  })

  const handleModifyTask = (taskData) => {
    modifyTask(id, taskData)
    closeModal()
  }

  const _start = watch('start')
  const _end = watch('end')

  useEffect(() => {
    if (dayjs(_end).isBefore(_start)) setValue('end', _start)
  }, [_start])

  return (
    <>
      <form onSubmit={handleSubmit(handleModifyTask)}>
        <div className={modalClasses.scroller}>
          <TextInput
            name="name"
            label="Название"
            rules={{ required: 'обязательное' }}
            autoFocus={isModalOpen}
            control={control}
          />
          <AreaInput
            name="desc"
            label="Описание"
            control={control}
          />
          <DateInput
            name="start"
            label="Начало"
            control={control}
          />
          <DateInput
            name="end"
            label="Конец"
            rules={{
              validate: end => {
                return dayjs(end).isSameOrAfter(_start) || 'не может быть раньше начала'
              }
            }}
            control={control}
          />
        </div>
        <div className={modalClasses.actions}>
          <Button visualDisabled={!isValid} type="submit">Сохранить</Button>
          <Button onClick={closeModal} secondary>Отмена</Button>
        </div>
      </form>
    </>
  )
}

export default ModifyTask