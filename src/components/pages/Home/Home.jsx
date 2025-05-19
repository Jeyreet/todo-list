import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useLayoutEffect, useMemo } from 'react'

import { useLS } from '../../../stores/useLS'
import { useUI } from '../../../stores/useUI'
import { pluralize } from '../../../utils/pluralize'
import { Collapser } from '../../ui/Collapser'
import { Title } from '../../ui/Title'
import c from './Home.module.scss'

dayjs.extend(customParseFormat)

export const Home = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Главная'))

  const tasks = useLS(state => state.tasks)

  const [undoneTasks, expiredTasks, todayTasks] = useMemo(() => {
    const now = dayjs().startOf('day')
    let undone = 0
    let expired = 0
    let today = 0

    for (const task of tasks) {
      if (!task.done) {
        undone++

        if (task.end) {
          const end = dayjs(task.end, 'DD.MM.YYYY')

          if (end.isBefore(now)) expired++
          else if (end.isSame(now)) today++
        }
      }
    }

    return [undone, expired, today]
  }, [tasks])

  return (
    <Collapser>
      <Title>Задачи</Title>
      {tasks.length === 0 && <p>Поставленных задач не найдено</p>}
      {tasks.length !== 0 && (
        <>
          {undoneTasks === 0 && <p>Все задачи выполнены</p>}
          {undoneTasks !== 0 && (
            <p>
              {undoneTasks}{' '}
              {pluralize(
                undoneTasks,
                'невыполненная задача',
                'невыполненные задачи',
                'невыполненных задач'
              )}
            </p>
          )}
          {expiredTasks !== 0 && (
            <p className={expiredTasks > 0 && c.alert}>
              🔥 {expiredTasks}{' '}
              {pluralize(
                expiredTasks,
                'просроченная задача',
                'просроченные задачи',
                'просроченных задач'
              )}
            </p>
          )}
          {todayTasks !== 0 && (
            <p className={todayTasks > 0 && c.warning}>
              ⏳ {todayTasks}{' '}
              {pluralize(
                todayTasks,
                'задача истекает сегодня',
                'задачи истекают сегодня',
                'задач истекают сегодня'
              )}
            </p>
          )}
        </>
      )}
    </Collapser>
  )
}
