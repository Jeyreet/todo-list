import { useLayoutEffect, useState } from 'react'

import Plus from '../../../assets/icons/plus.svg'
import TopDownArrows from '../../../assets/icons/top_down_arrows.svg'
import { usePopup } from '../../../hooks/usePopup'
import { useUI } from '../../../stores/useUI'
import { IconButton } from '../../controls/buttons/IconButton'
import { Collapser } from '../../ui/Collapser'
import { Gap } from '../../ui/Gap'
import { PageTools } from '../../ui/PageTools'
import { Sort } from '../../ui/Sort'
import { Add } from './Add'
import { List } from './List'
import c from './Tasks.module.scss'

const sortFields = [
  { value: 'id', label: 'По умолчанию' },
  { value: 'name', label: 'По названию' },
  { value: 'desc', label: 'По описанию' },
  { value: 'start', label: 'По дате начала' },
  { value: 'end', label: 'По дате завершения' },
  { value: 'done', label: 'По выполнению' }
]

const sortOrders = {
  id: [
    { value: 'desc', label: 'Сначала последние' },
    { value: 'asc', label: 'Сначала первые' }
  ],
  name: [
    { value: 'asc', label: 'В алфавитном порядке' },
    { value: 'desc', label: 'В обратном порядке' }
  ],
  desc: [
    { value: 'asc', label: 'В алфавитном порядке' },
    { value: 'desc', label: 'В обратном порядке' }
  ],
  start: [
    { value: 'asc', label: 'Сначала недавние' },
    { value: 'desc', label: 'Сначала давние' }
  ],
  end: [
    { value: 'asc', label: 'Сначала срочные' },
    { value: 'desc', label: 'Сначала несрочные' }
  ],
  done: [
    { value: 'desc', label: 'Сначала не выполненные' },
    { value: 'asc', label: 'Сначала выполненные' }
  ]
}

export const Tasks = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Задачи'))

  const addControls = usePopup()
  const sortControls = usePopup()
  const [sort, setSort] = useState(null)

  return (
    <Collapser>
      <List sort={sort} />

      <PageTools>
        <Gap>
          <IconButton icon={Plus} onClick={() => addControls.open()} />
          <IconButton
            icon={TopDownArrows}
            onClick={() => sortControls.open()}
          />
        </Gap>
      </PageTools>

      <Add controls={addControls} />
      <Sort
        controls={sortControls}
        setSort={setSort}
        fields={sortFields}
        orders={sortOrders}
      />
    </Collapser>
  )
}
