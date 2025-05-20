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
import c from './Categories.module.scss'
import { List } from './List'

const sortFields = [
  { value: 'id', label: 'По умолчанию' },
  { value: 'name', label: 'По названию' }
]

const sortOrders = {
  id: [
    { value: 'desc', label: 'Сначала последние' },
    { value: 'asc', label: 'Сначала первые' }
  ],
  name: [
    { value: 'asc', label: 'В алфавитном порядке' },
    { value: 'desc', label: 'В обратном порядке' }
  ]
}

export const Categories = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Категории'))

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
