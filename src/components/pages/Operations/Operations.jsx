import { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Plus from '../../../assets/icons/plus.svg'
import TopDownArrows from '../../../assets/icons/top_down_arrows.svg'
import { usePopup } from '../../../hooks/usePopup'
import { useUI } from '../../../stores/useUI'
import { IconButton } from '../../controls/buttons/IconButton'
import { DateInput } from '../../controls/inputs/DateInput'
import { Select } from '../../controls/inputs/Select'
import { Collapser } from '../../ui/Collapser'
import { DelayedUnmount } from '../../ui/DelayedUnmount'
import { Gap } from '../../ui/Gap'
import { PageTools } from '../../ui/PageTools'
import { Sort } from '../../ui/Sort'
import { Add } from './Add'
import c from './Operations.module.scss'

const sortFields = [
  { value: 'id', label: 'По умолчанию' },
  { value: 'amount', label: 'По сумме' },
  { value: 'desc', label: 'По описанию' }
]

const sortOrders = {
  id: [
    { value: 'desc', label: 'Сначала последние' },
    { value: 'asc', label: 'Сначала первые' }
  ],
  amount: [
    { value: 'desc', label: 'Сначала крупные' },
    { value: 'asc', label: 'Сначала мелкие' }
  ],
  desc: [
    { value: 'asc', label: 'В алфавитном порядке' },
    { value: 'desc', label: 'В обратном порядке' }
  ]
}

export const Operations = () => {
  const setCurrentPageTitle = useUI(state => state.setCurrentPageTitle)
  useLayoutEffect(() => setCurrentPageTitle('Операции'))

  const addControls = usePopup()
  const sortControls = usePopup()
  const [sort, setSort] = useState(null)

  const { control, watch } = useForm()
  const show = watch('show')

  return (
    <Collapser>
      <Gap column>
        <Select
          label="Показать операции"
          name="show"
          options={[
            { value: 'day', label: 'За сегодня' },
            { value: 'week', label: 'За неделю' },
            { value: 'month', label: 'За месяц' },
            { value: 'range', label: 'Выбрать период' }
          ]}
          control={control}
        />
        <DelayedUnmount>
          {show === 'range' && (
            <Collapser>
              <Gap className={c.gap}>
                <DateInput label="С" name="start" control={control} />
                <DateInput label="По" name="end" control={control} />
              </Gap>
            </Collapser>
          )}
        </DelayedUnmount>
      </Gap>

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
