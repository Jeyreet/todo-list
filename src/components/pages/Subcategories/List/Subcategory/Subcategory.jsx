import { memo, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Ellipsis from '../../../../../assets/icons/ellipsis.svg'
import { useContextPopup } from '../../../../../hooks/useContextPopup'
import { usePopup } from '../../../../../hooks/usePopup'
import { calculatePoint } from '../../../../../utils/calculatePoint'
import { IconButton } from '../../../../controls/buttons/IconButton'
import { Gap } from '../../../../ui/Gap'
import { ListCard } from '../../../../ui/ListCard'
import { Title } from '../../../../ui/Title'
import { ContextActions } from './ContextActions'
import { Modify } from './Modify'
import { Remove } from './Remove'
import c from './Subcategory.module.scss'

export const Subcategory = memo(({ subcategory: { id, name } }) => {
  const buttonRef = useRef(null)
  const point = useCallback(
    () => calculatePoint(buttonRef.current),
    [buttonRef]
  )
  const contextControls = useContextPopup(point)
  const modifyControls = usePopup()
  const removeControls = usePopup()
  const navigate = useNavigate()

  return (
    <ListCard className={c.Subcategory}>
      <Gap className={c.header}>
        <Title>{name}</Title>
        <IconButton
          className={c.button}
          cs={{ inner: c.inner }}
          ref={buttonRef}
          icon={Ellipsis}
          onClick={contextControls.open}
        />
      </Gap>

      <ContextActions
        handleSubcategories={() => navigate(`/categories/${id}`)}
        handleModifyCategory={modifyControls.open}
        handleRemoveCategory={removeControls.open}
        controls={contextControls}
      />

      <Modify id={id} controls={modifyControls} />
      <Remove id={id} controls={removeControls} />
    </ListCard>
  )
})
