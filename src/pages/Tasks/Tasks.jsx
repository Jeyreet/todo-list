import { Button } from '../../components/controls/Button/Button'
import { Task } from './Task/Task'
import { Title } from '../../components/Title/Title'
import { Collapser } from '../../components/Collapser/Collapser'
import PlusIcon from '../../assets/icons/plus.svg'

import {createRef, lazy, useEffect, useRef, useState} from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Tasks.module.css'
import {Transition, TransitionGroup} from "react-transition-group";
import {Select} from "../../components/controls/Select/Select.jsx";
import {useForm} from "react-hook-form";
import dayjs from "dayjs";

// const ModifyWallet = lazy(() => import('./ModifyWallet/ModifyWallet'))

const AddTask = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('./AddTask/AddTask')), 1000)
))

const Tasks = () => {
  const openModal = useGlobalStore(state => state.openModal)
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)
  const tasks = useGlobalStore(state => state.tasks.value)
  const [prevTasks, setPrevTasks] = useState(tasks)
  const [sortFunction, setSortFunction] = useState(() => (a, b) => b.id - a.id)

  useEffect(() => {
    setHeaderTitle('Задачи')
  }, [])

  useEffect(() => {
    setPrevTasks(prev => tasks.map(task => ({
      ...task,
      isNew: !prev.some(prevTask => prevTask.id === task.id)
    }))
      .sort(sortFunction))
  }, [tasks, sortFunction])

  const openAddTask = async () => {
    await AddTask
    openModal({
      title: 'Добавить задачу',
      body: <AddTask />,
      width: '400px'
    })
  }

  const {control} = useForm()

  return (
    <>
      {prevTasks.length > 0 && (
        <>
          <form>
            <Select control={control} label="Сортировка по" inline={true}>
              <div value="lol" onSelect={() => setSortFunction(() => (a, b) => b.id - a.id)}>
                умолчанию
              </div>
              <div value="kek" onSelect={() => setSortFunction(() => (a, b) => a.name.localeCompare(b.name))}>
                названию
              </div>
              <div value="cheburek" onSelect={() => setSortFunction(() => (a, b) => a.done - b.done)}>
                завершению
              </div>
              <div value="cheburek" onSelect={() => setSortFunction(() => (a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf())}>
                дате начала
              </div>
              <div value="cheburek" onSelect={() => setSortFunction(() => (a, b) => dayjs(b.end).valueOf() - dayjs(a.end).valueOf())}>
                дате конца
              </div>
            </Select>
          </form>
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
            })}
          </TransitionGroup>
        </>
      )}
      {prevTasks.length === 0 && (
        <Title>Задач не найдено</Title>
      )}
      <div className={classes.addTaskButton}>
        <Button onClick={openAddTask}>
          <PlusIcon className="icon icon--button" />
        </Button>
      </div>
    </>
  )
}

export default Tasks