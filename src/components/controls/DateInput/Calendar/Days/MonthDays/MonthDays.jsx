import classes from './MonthDays.module.css'
import {Button} from "../../../../Button/Button.jsx";
import {useDateInput} from "../../../DateInputContext.jsx";
import dayjs from "dayjs";

export const MonthDays = () => {
  const {
    value,
    onChange,
  } = useDateInput()

  const date = dayjs(value)
  const nowDay = date.date()
  const monthStart = date.startOf('month')
  const daysInMonth = monthStart.daysInMonth()

  const setDate = (day) => {
    onChange(dayjs(value).date(day).format('YYYY-MM-DD'))
  }

  return (
    <>
      {Array.from({ length: daysInMonth }).map((_, i) =>
        <Button
          className={classes.button}
          disabled={i + 1 === nowDay}
          key={i}
          onClick={() => setDate(i + 1)}
          tabIndex="-1"
        >
          {i + 1}
        </Button>
      )}
    </>
  )
}