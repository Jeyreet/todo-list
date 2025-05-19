import clsx from 'clsx'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useMemo, useState } from 'react'

import ArrowIcon from '../../../../../assets/icons/arrow.svg'
import RoundArrow from '../../../../../assets/icons/round_arrow.svg'
import { Gap } from '../../../../ui/Gap'
import { Popup } from '../../../../ui/Popup'
import { Button } from '../../../buttons/Button'
import { IconButton } from '../../../buttons/IconButton'
import c from './Calendar.module.scss'

dayjs.extend(customParseFormat)

export const Calendar = ({ setDate, day, month, year, controls }) => {
  const [nowMonth, setNowMonth] = useState(
    Number(month !== '' ? month : dayjs().format('M') - 1)
  )

  const [nowYear, setNowYear] = useState(
    Number(year !== '' ? year : dayjs().format('YYYY'))
  )

  const offsetDays = useMemo(() => {
    const sundayOffsetDays = dayjs(
      `1.${nowMonth + 1}.${nowYear}`,
      'D.M.Y'
    ).day()

    return sundayOffsetDays === 0 ? 6 : sundayOffsetDays - 1
  }, [nowMonth, nowYear])

  const monthDays = useMemo(
    () => dayjs(`1.${nowMonth + 1}.${nowYear}`, 'D.M.Y').daysInMonth(),
    [nowMonth, nowYear]
  )

  const decreaseMonth = () => {
    setNowMonth(prev => {
      let newMonth = prev - 1

      if (newMonth < 0) {
        newMonth = 11
        decreaseYear()
      }

      return newMonth
    })
  }

  const increaseMonth = () => {
    setNowMonth(prev => {
      let newMonth = prev + 1

      if (newMonth > 11) {
        newMonth = 0
        increaseYear()
      }

      return newMonth
    })
  }

  const decreaseYear = () => {
    setNowYear(prev => prev - 1)
  }

  const increaseYear = () => {
    setNowYear(prev => prev + 1)
  }

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]

  return (
    <Popup controls={controls}>
      <Gap column>
        <div className={c.controls}>
          <div className={c.monthWrapper}>
            <IconButton
              cs={{ inner: c.monthButtonInner }}
              icon={ArrowIcon}
              onClick={decreaseMonth}
            />
            <div className={c.month}>{months[nowMonth]}</div>
            <IconButton
              cs={{ inner: c.monthButtonInner, icon: c.nextMonthIcon }}
              icon={ArrowIcon}
              onClick={increaseMonth}
            />
          </div>
          <div className={c.yearWrapper}>
            <IconButton
              className={c.yearButton}
              cs={{ inner: c.yearButtonInner, icon: c.nextYearIcon }}
              icon={ArrowIcon}
              onClick={increaseYear}
            />
            <IconButton
              className={c.yearButton}
              cs={{ inner: c.yearButtonInner, icon: c.prevYearIcon }}
              icon={ArrowIcon}
              onClick={decreaseYear}
            />
            <div className={c.year}>{nowYear}</div>
          </div>
        </div>
        <div className={c.days}>
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(weekday => (
            <div className={c.weekday} key={weekday}>
              {weekday}
            </div>
          ))}
          {Array.from({ length: offsetDays }).map((_, i) => (
            <div key={i} />
          ))}
          {Array.from({ length: monthDays }).map((_, i) => (
            <Button
              cs={{
                inner: clsx(
                  c.monthDayInner,
                  Number(day) === i + 1 &&
                    Number(month) === nowMonth + 1 &&
                    Number(year) === nowYear &&
                    c.selected
                )
              }}
              key={i}
              onClick={() => {
                const date = dayjs(
                  `${i + 1}.${nowMonth + 1}.${nowYear}`,
                  'D.M.Y'
                )
                setDate(
                  date.format('DD'),
                  date.format('MM'),
                  date.format('YYYY')
                )
                controls.close()
              }}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Gap>
          <Button
            onClick={() => {
              const date = dayjs().subtract(1, 'day')
              setDate(date.format('DD'), date.format('MM'), date.format('YYYY'))
              controls.close()
            }}
          >
            Вчера
          </Button>
          <Button
            onClick={() => {
              const date = dayjs()
              setDate(date.format('DD'), date.format('MM'), date.format('YYYY'))
              controls.close()
            }}
          >
            Сегодня
          </Button>
          <Button
            onClick={() => {
              const date = dayjs().add(1, 'day')
              setDate(date.format('DD'), date.format('MM'), date.format('YYYY'))
              controls.close()
            }}
          >
            Завтра
          </Button>
          <div className={c.resetButtonWrapper}>
            <IconButton
              cs={{ inner: c.resetButtonInner }}
              onClick={() => {
                setDate('', '', '')
                controls.close()
              }}
              icon={RoundArrow}
            />
          </div>
        </Gap>
      </Gap>
    </Popup>
  )
}
