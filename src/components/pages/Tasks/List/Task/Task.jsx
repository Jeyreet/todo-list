import clsx from 'clsx'
import { memo, useCallback, useRef } from 'react'

import Ellipsis from '../../../../../assets/icons/ellipsis.svg'
import Pause from '../../../../../assets/icons/pause.svg'
import Play from '../../../../../assets/icons/play.svg'
import { useContextPopup } from '../../../../../hooks/useContextPopup'
import { usePopup } from '../../../../../hooks/usePopup'
import { LSControls, useLS } from '../../../../../stores/useLS'
import { calculatePoint } from '../../../../../utils/calculatePoint'
import { IconButton } from '../../../../controls/buttons/IconButton'
import { Gap } from '../../../../ui/Gap'
import { ListCard } from '../../../../ui/ListCard'
import { Title } from '../../../../ui/Title'
import { ContextActions } from './ContextActions'
import { Modify } from './Modify'
import { Remove } from './Remove'
import c from './Task.module.scss'

export const Task = memo(({ task: { id, name, desc, start, end, done } }) => {
  const toggleTask = LSControls.toggleTask
  const removeTask = LSControls.removeTask
  const taskRemoveConfirmation = useLS(state => state.taskRemoveConfirmation)

  const buttonRef = useRef(null)
  const point = useCallback(
    () => calculatePoint(buttonRef.current),
    [buttonRef]
  )
  const contextControls = useContextPopup(point)
  const modifyControls = usePopup()
  const removeControls = usePopup()

  const handleRemoveTask = () => {
    if (taskRemoveConfirmation) removeControls.open()
    else removeTask(id)
  }

  return (
    <ListCard className={clsx(c.Task, !done && c.done)}>
      <Gap column>
        <Gap className={c.header}>
          <Title>{name}</Title>
          <Gap className={c.actions}>
            <IconButton
              className={c.button}
              cs={{ inner: c.inner }}
              icon={done ? Play : Pause}
              onClick={() => toggleTask(id)}
            />
            <IconButton
              className={c.button}
              cs={{ inner: c.inner }}
              ref={buttonRef}
              icon={Ellipsis}
              onClick={contextControls.open}
            />
          </Gap>
        </Gap>
        {(desc !== '' || start || end) && (
          <Gap className={c.desc}>
            {desc}
            {(start || end) && (
              <Gap>
                <Gap column>
                  {start && <p className={c.p}>Начало: </p>}
                  {end && <p className={c.p}>Завершение: </p>}
                </Gap>
                <Gap column>
                  {start && <p>{start}</p>}
                  {end && <p>{end}</p>}
                </Gap>
              </Gap>
            )}
          </Gap>
        )}
      </Gap>

      <ContextActions
        handleModifyTask={modifyControls.open}
        handleRemoveTask={handleRemoveTask}
        controls={contextControls}
      />

      <Modify id={id} controls={modifyControls} />
      <Remove id={id} controls={removeControls} />
    </ListCard>
  )
})
