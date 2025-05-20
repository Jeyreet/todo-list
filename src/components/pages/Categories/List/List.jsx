import { memo, useMemo } from 'react'

import { useLS } from '../../../../stores/useLS'
import { numberSort } from '../../../../utils/numberSort'
import { stringsSort } from '../../../../utils/stringsSort'
import { Collapser } from '../../../ui/Collapser'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'
import { Title } from '../../../ui/Title'
import { Category } from './Category'
import c from './List.module.scss'

const sortHandlers = {
  id: numberSort('id'),
  name: stringsSort('name')
}

export const List = memo(({ sort }) => {
  const categories = useLS(state => state.categories)

  const sortedExpenseCategories = useMemo(
    () =>
      sortHandlers[sort?.field ?? 'id'][sort?.order ?? 'desc'](
        categories.filter(category => category.type === 'expense')
      ),
    [categories, sort]
  )

  const sortedIncomeCategories = useMemo(
    () =>
      sortHandlers[sort?.field ?? 'id'][sort?.order ?? 'desc'](
        categories.filter(category => category.type === 'income')
      ),
    [categories, sort]
  )

  return (
    <DelayedUnmount timeout={500}>
      {categories.length === 0 && (
        <Collapser>
          <Title center indent>
            Категорий не найдено
          </Title>
        </Collapser>
      )}
      {sortedExpenseCategories.length !== 0 && (
        <Collapser>
          <Title className={c.title}>Категории расходов</Title>
        </Collapser>
      )}
      {sortedExpenseCategories.map(category => (
        <Collapser key={category.id}>
          <Category category={category} />
        </Collapser>
      ))}
      {sortedExpenseCategories.length !== 0 && (
        <Collapser>
          <div className={c.indent} />
        </Collapser>
      )}
      {sortedIncomeCategories.length !== 0 && (
        <Collapser>
          <Title className={c.title}>Категории доходов</Title>
        </Collapser>
      )}
      {sortedIncomeCategories.map(category => (
        <Collapser key={category.id}>
          <Category category={category} />
        </Collapser>
      ))}
    </DelayedUnmount>
  )
})
