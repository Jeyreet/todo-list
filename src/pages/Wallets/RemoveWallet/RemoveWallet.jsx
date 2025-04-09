import { Button } from '../../../components/controls/Button/Button'

import { useMemo } from 'react'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import modalClasses from '../../../components/App/Modal/Modal.module.css'

const RemoveWallet = ({id}) => {
  const removeWallet = useGlobalStore(state => state.removeWallet)
  const {name} = useMemo(() => useGlobalStore.getState().getWallet(id), [])
  const closeModal = useGlobalStore(state => state.closeModal)
  const isModalOpen = useGlobalStore(state => state.isModalOpen)

  const handleRemoveWallet = async () => {
    removeWallet(id)
    closeModal()
  }

  return (
    <>
      <div className={modalClasses.scroller}>
        <p>Вы точно хотите удалить счет "{name}"?</p>
        <br />
        <p>Все операции, связанные с этим счетом также будут удалены</p>
      </div>
      <div className={modalClasses.actions}>
        <Button onClick={handleRemoveWallet} autoFocus={isModalOpen}>Удалить</Button>
        <Button onClick={closeModal} secondary>Отмена</Button>
      </div>
    </>
  )
}

export default RemoveWallet