import { memo, useMemo } from 'react'

import { useLS } from '../../../../stores/useLS'
import { numberSort } from '../../../../utils/numberSort'
import { stringsSort } from '../../../../utils/stringsSort'
import { Collapser } from '../../../ui/Collapser'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'
import { Title } from '../../../ui/Title'
import c from './List.module.scss'
import { Subcategory } from './Subcategory'

const sortHandlers = {
  id: numberSort('id'),
  name: stringsSort('name')
}

export const List = memo(({ id, sort }) => {
  const categories = useLS(state => state.categories)

  const sortedFilteredSubcategories = useMemo(
    () =>
      sortHandlers[sort?.field ?? 'id'][sort?.order ?? 'desc'](
        categories.filter(category => category.parent === id)
      ),
    [categories, id, sort]
  )

  return (
    <DelayedUnmount timeout={500}>
      {sortedFilteredSubcategories.length === 0 && (
        <Collapser>
          <Title center indent>
            Подкатегорий не найдено
          </Title>
        </Collapser>
      )}
      {sortedFilteredSubcategories.map(subcategory => (
        <Collapser key={subcategory.id}>
          <Subcategory subcategory={subcategory} />
        </Collapser>
      ))}
    </DelayedUnmount>
  )
})
