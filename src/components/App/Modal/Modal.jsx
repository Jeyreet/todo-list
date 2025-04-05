import { useEffect, useState } from 'react'
import { useEscape } from '../../../hooks/useEscape'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import classes from './Modal.module.css'

export const Modal = () => {
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const closeModal = useGlobalStore(state => state.closeModal)
  const modalContent = useGlobalStore(state => state.modalContent)
  const modalSize = useGlobalStore(state => state.modalSize)

  const [resetKey, setResetKey] = useState(0)

  useEscape(closeModal, isModalOpen)

  useEffect(() => {
    if (isModalOpen) setResetKey(prev => prev + 1)
  }, [isModalOpen])

  return (
    <div
      className={classes.Modal}
      onClick={closeModal}
      inert={!isModalOpen}
    >
      <div
        className={classes.inner}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: modalSize?.[0],
          maxHeight: modalSize?.[1],
        }}
      >
        <div key={resetKey} className={classes.keyWrapper}>
          {modalContent}
        </div>
      </div>
    </div>
  )
}