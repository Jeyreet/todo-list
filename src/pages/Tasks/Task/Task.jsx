import { Button } from '../../../components/controls/Button/Button'

import { lazy } from 'react'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import clsx from 'clsx'
import classes from './Task.module.css'
import dayjs from 'dayjs'

// const RemoveWallet = lazy(() => import('../RemoveWallet/RemoveWallet'))

const RemoveTask = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../RemoveTask/RemoveTask')), 1000)
))

export const Task = ({id, name, desc, done, start, end}) => {
  const toggleTask = useGlobalStore(state => state.toggleTask)
  const openModal = useGlobalStore(state => state.openModal)

  const openRemoveTask = async () => {
    await RemoveTask
    openModal({
      title: 'Удалить задачу',
      body: <RemoveTask id={id} />,
      maxWidth: '400px'
    })
  }

  return (
    <div className={clsx(classes.Task, done && classes.done)}>
      <div className={classes.info}>
        <h3 className={classes.name}>{name}</h3>
        {desc && <p>{desc}</p>}
        <p>Выполнить с {dayjs(start).format('DD.MM.YYYY')} по {dayjs(end).format('DD.MM.YYYY')}</p>
      </div>
      <div className={classes.actions}>
        <Button onClick={() => toggleTask(id)}>{done ? 'Возобновить' : 'Завершить'}</Button>
        <Button onClick={openRemoveTask}>Удалить</Button>
      </div>
    </div>
  )
}