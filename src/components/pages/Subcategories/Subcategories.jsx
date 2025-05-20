import { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Plus from '../../../assets/icons/plus.svg'
import TopDownArrows from '../../../assets/icons/top_down_arrows.svg'
import { usePopup } from '../../../hooks/usePopup'
import { LSControls } from '../../../stores/useLS'
import { useUI } from '../../../stores/useUI'
import { Button } from '../../controls/buttons/Button'
import { IconButton } from '../../controls/buttons/IconButton'
import { Collapser } from '../../ui/Collapser'
import { Gap } from '../../ui/Gap'
import { PageTools } from '../../ui/PageTools'
import { Sort } from '../../ui/Sort'
import { Add } from './Add'
import { List } from './List'
// import { List } from './List'
import c from './Subcategories.module.scss'

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

export const Subcategories = () => {
  const params = useParams()
  const id = Number(params.id)
  const mainCategory = LSControls.getCategory(id)

  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() =>
    setCurrentPageTitle(
      mainCategory ? `Подкатегории "${mainCategory.name}"` : 'Ошибка!'
    )
  )

  const addControls = usePopup()
  const sortControls = usePopup()
  const [sort, setSort] = useState(null)
  const navigate = useNavigate()

  return (
    <Collapser>
      {!mainCategory && (
        <Gap column>
          <p>Вы перешли на страницу подкатегорий несуществующей категории</p>
          <Button onClick={() => navigate('/categories')}>
            Перейти в категории
          </Button>
        </Gap>
      )}
      {mainCategory && (
        <>
          <List id={id} sort={sort} />

          <PageTools>
            <Gap>
              <IconButton
                icon={Plus}
                label="Подкатегория"
                onClick={() => addControls.open()}
              />
              <IconButton
                icon={TopDownArrows}
                onClick={() => sortControls.open()}
              />
            </Gap>
          </PageTools>

          <Add id={id} controls={addControls} />
          <Sort
            controls={sortControls}
            setSort={setSort}
            fields={sortFields}
            orders={sortOrders}
          />
        </>
      )}
    </Collapser>
  )
}
