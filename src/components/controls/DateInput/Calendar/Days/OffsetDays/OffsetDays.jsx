import classes from './OffsetDays.module.css'
import {useDateInput} from "../../../DateInputContext.jsx";
import dayjs from "dayjs";

export const OffsetDays = () => {
  const {
    value
  } = useDateInput()

  const monthStart = dayjs(value).startOf('month')
  const offsetCount =  monthStart.day() === 0 ? 6 : monthStart.day() - 1

  return (
    <>
      {Array.from({ length: offsetCount }).map((_, i) =>
        <div key={i}/>
      )}
    </>
  )
}