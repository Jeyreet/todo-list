import { Button } from '../../../components/controls/Button/Button'

import { useGlobalStore } from '../../../hooks/useGlobalStore'

import classes from './Task.module.css'
import dayjs from 'dayjs'

export const Task = ({id, name, desc, done, start, end}) => {
  const toggleTask = useGlobalStore(state => state.toggleTask)
  const removeTask = useGlobalStore(state => state.removeTask)

  return (
    <div className={classes.Task}>
      id: {id}, name: {name}, desc: {desc}, done: {String(done)}, start: {dayjs(start).format('DD.MM.YYYY')}, end: {dayjs(end).format('DD.MM.YYYY')}
      <Button onClick={() => toggleTask(id)}>{done ? 'Возобновить' : 'Завершить'}</Button>
      <Button onClick={() => removeTask(id)}>Удалить</Button>
    </div>
  )
}