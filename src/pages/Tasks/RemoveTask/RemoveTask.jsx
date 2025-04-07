import { Button } from '../../../components/controls/Button/Button'

import { useGlobalStore } from '../../../hooks/useGlobalStore'

import modalClasses from '../../../components/App/Modal/Modal.module.css'

const RemoveTask = ({name, id}) => {
  const removeTask = useGlobalStore(state => state.removeTask)
  const closeModal = useGlobalStore(state => state.closeModal)
  const isModalOpen = useGlobalStore(state => state.isModalOpen)

  const handleRemoveTask = async () => {
    removeTask(id)
    closeModal()
  }

  return (
    <>
      <div className={modalClasses.scroller}>
        <p>Вы точно хотите удалить задачу "{name}"?</p>
      </div>
      <div className={modalClasses.actions}>
        <Button onClick={handleRemoveTask} autoFocus={isModalOpen}>Удалить</Button>
        <Button onClick={closeModal} secondary>Отмена</Button>
      </div>
    </>
  )
}

export default RemoveTask