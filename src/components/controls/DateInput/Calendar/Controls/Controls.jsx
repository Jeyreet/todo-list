import { Button } from '../../../Button/Button'
import ChevronLeftIcon from '../../../../../assets/icons/chevron_left.svg'
import ChevronRightIcon from '../../../../../assets/icons/chevron_right.svg'
import ArrowRoundIcon from '../../../../../assets/icons/arrow_round.svg'

import { useMemo } from 'react'
import { useDateInput } from '../../DateInputContext.jsx'

import classes from './Controls.module.css'
import dayjs from "dayjs";

export const Controls = () => {
  const {
    value,
    onChange,
  } = useDateInput()

  const month = useMemo(() => dayjs(value).get('month'), [value])
  const year = useMemo(() => dayjs(value).get('year'), [value])

  const months = [
    'Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  const increaseMonth = () => {
    onChange(dayjs(value)
      .add(1, 'month')
      .format('YYYY-MM-DD'))
  }

  const decreaseMonth = () => {
    onChange(dayjs(value)
      .add(-1, 'month')
      .format('YYYY-MM-DD'))
  }

  const clear = () => {
    onChange(dayjs().format('YYYY-MM-DD'))
  }

  return (
    <div className={classes.Controls}>
      <Button onClick={decreaseMonth} tabIndex="-1">
        <ChevronLeftIcon className="icon icon--button" />
      </Button>
      <div className={classes.text}>{months[month]} {year} г.</div>
      <Button onClick={increaseMonth} tabIndex="-1">
        <ChevronRightIcon className="icon icon--button" />
      </Button>
      <Button onClick={clear} tabIndex="-1">
        <ArrowRoundIcon className="icon icon--button" />
      </Button>
    </div>
  )
}