import classes from './Tasks.module.css'
import {lazy, useEffect} from 'react'
import {Button} from '../../components/buttons/Button/Button'
import {useApp} from '../../components/App/AppContext'

// const AddTaskPage = lazy(() => import('./AddTask/AddTask'))

const AddTaskPage = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../pages/Tasks/AddTask/AddTask')), 1000)
))

const Tasks = () => {
  const {openModal, setHeaderTitle} = useApp()

  useEffect(() => {
    setHeaderTitle('Задачи')
  }, [])

  return (
    <>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <p>TASKS</p>
      <Button
        className={classes.AddTaskButton}
        onClick={async () => {
          await AddTaskPage
          openModal(<AddTaskPage />)
        }}>
        Добавить задачу
      </Button>
    </>
  )
}

export default Tasks