import CalendarIcon from '../../../../../assets/icons/calendar.svg'
import { IconButton } from '../../../buttons/IconButton'
import c from './CalendarButton.module.scss'

export const CalendarButton = ({ onClick }) => {
  return (
    <div className={c.CalendarButton}>
      <IconButton
        className={c.button}
        cs={{ inner: c.inner }}
        icon={CalendarIcon}
        onClick={onClick}
      />
    </div>
  )
}
