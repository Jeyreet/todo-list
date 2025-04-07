import { useEffect, useState } from 'react'
import { useEscape } from '../../../hooks/useEscape'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import classes from './Modal.module.css'
import modalClasses from "./Modal.module.css";
import {Button} from "../../controls/Button/Button.jsx";

export const Modal = () => {
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const closeModal = useGlobalStore(state => state.closeModal)
  const modalContent = useGlobalStore(state => state.modalContent)

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
      style={{
        '--maxWidth': modalContent?.maxWidth,
        '--maxHeight': modalContent?.maxHeight,
        '--width': modalContent?.width,
        '--height': modalContent?.height,
      }}
    >
      <div
        className={classes.inner}
        onClick={e => e.stopPropagation()}
      >
        <div key={resetKey} className={classes.keyWrapper}>
          <h2 className={classes.header}>
            {modalContent?.title}
          </h2>
          {modalContent?.body}
        </div>
      </div>
    </div>
  )
}