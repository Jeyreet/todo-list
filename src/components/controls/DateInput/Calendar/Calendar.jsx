import { Controls } from './Controls/Controls'
import { Days } from './Days/Days'
import { Portal } from '../../../Portal'

import { useDateInput } from '../DateInputContext.jsx'

import classes from './Calendar.module.css'
import {useEscape} from "../../../../hooks/useEscape.js";

export const Calendar = () => {
  const {
    isOpen,
    close,
    calendarRef,
  } = useDateInput()

  useEscape(close, isOpen)

  return (
    <Portal>
      <div className={classes.Calendar} inert={!isOpen} onClick={close}>
        <div className={classes.inner} ref={calendarRef} onClick={e => e.stopPropagation()}>
          <div className={classes.hider}>
            <div className={classes.padding}>
              <Controls />
              <Days />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}