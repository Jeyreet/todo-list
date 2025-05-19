import { memo, useMemo } from 'react'

import { useLS } from '../../../../stores/useLS'
import { booleanSort } from '../../../../utils/booleanSort'
import { numberSort } from '../../../../utils/numberSort'
import { stringsSort } from '../../../../utils/stringsSort'
import { Collapser } from '../../../ui/Collapser'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'
import { Title } from '../../../ui/Title'
import c from './List.module.scss'
import { Task } from './Task'

const sortHandlers = {
  id: numberSort('id'),
  name: stringsSort('name'),
  desc: stringsSort('desc'),
  start: stringsSort('start'),
  end: stringsSort('end'),
  done: booleanSort('done')
}

export const List = memo(({ sort }) => {
  const tasks = useLS(state => state.tasks)

  const sortedTasks = useMemo(
    () => sortHandlers[sort?.field ?? 'id'][sort?.order ?? 'desc'](tasks),
    [tasks, sort]
  )

  return (
    <DelayedUnmount timeout={500}>
      {tasks.length === 0 && (
        <Collapser>
          <Title center indent>
            Задач не найдено
          </Title>
        </Collapser>
      )}
      {sortedTasks.map(task => (
        <Collapser key={task.id}>
          <Task task={task} />
        </Collapser>
      ))}
    </DelayedUnmount>
  )
})
