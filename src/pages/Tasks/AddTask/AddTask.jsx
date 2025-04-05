import { Button } from '../../../components/controls/Button/Button'
import { TextInput } from '../../../components/controls/TextInput/TextInput'
import { AreaInput } from '../../../components/controls/AreaInput/AreaInput'
import { DateInput } from '../../../components/controls/DateInput/DateInput'

import { useForm } from 'react-hook-form'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import modalClasses from '../../../components/App/Modal/Modal.module.css'

const AddTask = () => {
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const closeModal = useGlobalStore(state => state.closeModal)
  const addTask = useGlobalStore(state => state.addTask)

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  })

  const handleAddTask = (data) => {
    closeModal()
    addTask(data)
  }

  return (
    <>
      <h2 className={modalClasses.title}>
        Добавление задачи
      </h2>
      <form onSubmit={handleSubmit(handleAddTask)}>
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
            control={control}
          />
        </div>
        <div className={modalClasses.actions}>
          <Button visualDisabled={!isValid} type="submit">Добавить</Button>
          <Button onClick={closeModal}>Отмена</Button>
        </div>
      </form>
    </>
  )
}

export default AddTask