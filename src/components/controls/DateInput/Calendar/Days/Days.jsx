import classes from './Days.module.css'
import {WeekDays} from "./WeekDays/WeekDays.jsx";
import {OffsetDays} from "./OffsetDays/OffsetDays.jsx";
import {MonthDays} from "./MonthDays/MonthDays.jsx";

export const Days = () => {
  return (
    <div className={classes.Days}>
      <WeekDays />
      <OffsetDays />
      <MonthDays />
    </div>
  )
}