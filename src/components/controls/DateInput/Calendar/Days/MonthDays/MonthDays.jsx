import classes from './MonthDays.module.css'
import {Button} from "../../../../Button/Button.jsx";
import {useDateInput} from "../../../DateInputContext.jsx";
import dayjs from "dayjs";

export const MonthDays = () => {
  const {
    value,
    onChange,
    close,
  } = useDateInput()

  const date = dayjs(value)
  const nowDay = date.date()
  const daysInMonth = date.startOf('month').daysInMonth()

  const setDate = (day) => {
    close()
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