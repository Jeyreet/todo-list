import { Button } from '../../components/controls/Button/Button'
import { Task } from './Task/Task'
import { Title } from '../../components/Title/Title'
import { Collapser } from '../../components/Collapser/Collapser'

import {createRef, lazy, useEffect, useRef, useState} from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Tasks.module.css'
import {Transition, TransitionGroup} from "react-transition-group";

// const AddTask = lazy(() => import('./AddTask/AddTask'))

const AddTask = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('./AddTask/AddTask')), 1000)
))

const Tasks = () => {
  const openModal = useGlobalStore(state => state.openModal)
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)
  const tasks = useGlobalStore(state => state.tasks)
  const [prevTasks, setPrevTasks] = useState(tasks)

  useEffect(() => {
    setHeaderTitle('Задачи')
  }, [])

  useEffect(() => {
    setPrevTasks(tasks.map(task => ({
      ...task,
      isNew: !Boolean(prevTasks.filter(prevTask => prevTask.id === task.id).length)
    })))
  }, [tasks])

  const openAddTask = async () => {
    await AddTask
    openModal({
      title: 'Добавить задачу',
      body: <AddTask />,
      width: '400px'
    })
  }

  return (
    <>
      <TransitionGroup component="ul" className={classes.Tasks}>
        {prevTasks.map(({id, name, desc, done, start, end, isNew}) => {
          const liRef = createRef()
          const collapserRef = createRef()

          return (
            <Transition
              key={id}
              timeout={300}
              nodeRef={liRef}
              onExit={() => collapserRef?.current?.close()}
            >
              <li ref={liRef}>
                <Collapser ref={collapserRef} smoothAppear={isNew}>
                  <Task
                    id={id}
                    name={name}
                    desc={desc}
                    done={done}
                    start={start}
                    end={end}
                  />
                </Collapser>
              </li>
            </Transition>
          )
        })
      }
      </TransitionGroup>
      {!tasks.length && (
        <Title>Задач не найдено</Title>
      )}
      <Button
        className={classes.addTaskButton}
        onClick={openAddTask}
      >
        Добавить задачу
      </Button>
    </>
  )
}

export default Tasks