import { Button } from '../../components/controls/Button/Button'
import { Task } from './Task/Task'
import { Title } from '../../components/Title/Title'

import { lazy, useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Tasks.module.css'

// const AddTaskPage = lazy(() => import('./AddTask/AddTask'))

const AddTaskPage = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../pages/Tasks/AddTask/AddTask')), 1000)
))

const Tasks = () => {
  const openModal = useGlobalStore(state => state.openModal)
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)
  const tasks = useGlobalStore(state => state.tasks)

  useEffect(() => {
    setHeaderTitle('Задачи')
  }, [])

  const openAddTask = async () => {
    await AddTaskPage
    openModal(<AddTaskPage/>, [400, 500])
  }

  return (
    <>
      {tasks.map(({id, name, desc, done, start, end}) => (
        <Task
          key={id}
          id={id}
          name={name}
          desc={desc}
          done={done}
          start={start}
          end={end}
        />
      ))}
      {!tasks.length && (
        <Title>Задач не найдено</Title>
      )}
      <Button
        className={classes.AddTaskButton}
        onClick={openAddTask}
      >
        Добавить задачу
      </Button>
    </>
  )
}
export default Tasks