import classes from './WeekDays.module.css'

export const WeekDays = () => {
  return (
    <>
      {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day, i) =>
        <div className={classes.weekday} key={i}>{day}</div>
      )}
    </>
  )
}