import classes from './Modal.module.css'
import { useApp } from '../App/AppContext'
import clsx from 'clsx'
import {useEffect, useState} from "react";

export const Modal = () => {
  const {modalOpen, modalContent} = useApp()

  return (
    <div
      className={clsx(classes.Modal, modalOpen && classes.open)}
      onClick={e => e.stopPropagation()}
      inert={!modalOpen}
    >
      <div key={modalOpen}>
        {modalContent}
      </div>
    </div>
  )
}