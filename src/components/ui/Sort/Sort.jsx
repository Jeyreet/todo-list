import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { memo } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../controls/buttons/Button'
import { Select } from '../../controls/inputs/Select'
import { Gap } from '../Gap'
import { Popup } from '../Popup'
import c from './Sort.module.scss'

dayjs.extend(customParseFormat)

export const Sort = memo(({ setSort, controls, fields, orders }) => {
  const { control, watch, handleSubmit } = useForm({
    mode: 'onChange'
  })

  const handleSetSort = data => {
    controls.close()
    setSort(data)
  }

  return (
    <Popup controls={controls} minWidth={250}>
      <Gap column>
        <form onSubmit={handleSubmit(handleSetSort)}>
          <Popup.Scroller>
            <Gap column>
              <Select
                label="Сортировка"
                name="field"
                options={fields}
                control={control}
                autoFocus
              />
              <Select
                label="Порядок"
                name="order"
                options={orders[watch('field')]}
                control={control}
              />
            </Gap>
          </Popup.Scroller>
          <Button type="submit">Применить</Button>
        </form>
      </Gap>
    </Popup>
  )
})
