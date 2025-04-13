import { Button } from '../../../components/controls/Button/Button'
import PenIcon from '../../../assets/icons/pen.svg'
import TrashcanIcon from '../../../assets/icons/trashcan.svg'

import { lazy } from 'react'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import clsx from 'clsx'
import classes from './Task.module.css'
import dayjs from 'dayjs'

// const ModifyTask = lazy(() => import('../ModifyTask/ModifyTask'))
// const RemoveTask = lazy(() => import('../RemoveTask/RemoveTask'))

const ModifyTask = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../ModifyTask/ModifyTask')), 1000)
))
const RemoveTask = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../RemoveTask/RemoveTask')), 1000)
))

export const Task = ({id, name, desc, done, start, end}) => {
  const modifyTask = useGlobalStore(state => state.modifyTask)
  const openModal = useGlobalStore(state => state.openModal)

  const openModifyTask = async () => {
    await RemoveTask
    openModal({
      title: 'Изменить задачу',
      body: <ModifyTask id={id} />,
      width: '400px'
    })
  }

  const openRemoveTask = async () => {
    await RemoveTask
    openModal({
      title: 'Подтверждение',
      body: <RemoveTask id={id} />,
      maxWidth: '400px'
    })
  }

  const toggleTask = () => {
    modifyTask(id, {done: !done})
  }

  return (
    <div className={clsx(classes.Task, done && classes.done)}>
      <div className={classes.info}>
        <h3 className={classes.name}>{name}</h3>
        {desc && <p>{desc}</p>}
        <p>Выполнить с {dayjs(start).format('DD.MM.YYYY')} по {dayjs(end).format('DD.MM.YYYY')}</p>
      </div>
      <div className={classes.actions}>
        <Button className={classes.toggleButton} onClick={toggleTask}>{done ? 'Возобновить' : 'Завершить'}</Button>
        <Button onClick={openModifyTask}>
          <PenIcon className="icon icon--button" />
        </Button>
        <Button onClick={openRemoveTask}>
          <TrashcanIcon className="icon icon--button" />
        </Button>
      </div>
    </div>
  )
}