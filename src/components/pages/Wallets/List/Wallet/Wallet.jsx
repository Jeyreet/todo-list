import { memo, useCallback, useRef } from 'react'

import Ellipsis from '../../../../../assets/icons/ellipsis.svg'
import { useContextPopup } from '../../../../../hooks/useContextPopup'
import { usePopup } from '../../../../../hooks/usePopup'
import { calculatePoint } from '../../../../../utils/calculatePoint'
import { makePrecision } from '../../../../../utils/precision'
import { IconButton } from '../../../../controls/buttons/IconButton'
import { Gap } from '../../../../ui/Gap'
import { ListCard } from '../../../../ui/ListCard'
import { Title } from '../../../../ui/Title'
import { ContextActions } from './ContextActions'
import { Modify } from './Modify'
import { Remove } from './Remove'
import c from './Wallet.module.scss'

export const Wallet = memo(({ wallet: { id, name, balance, main } }) => {
  const buttonRef = useRef(null)
  const point = useCallback(
    () => calculatePoint(buttonRef.current),
    [buttonRef]
  )
  const contextControls = useContextPopup(point)
  const modifyControls = usePopup()
  const removeControls = usePopup()

  return (
    <ListCard className={c.Wallet}>
      <Gap column>
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
        <p>
          Баланс: {makePrecision(balance, 2)}
          {main && (
            <>
              {' '}
              — <span className={c.main}>основной</span>
            </>
          )}
        </p>
      </Gap>

      <ContextActions
        handleModifyWallet={modifyControls.open}
        handleRemoveWallet={removeControls.open}
        controls={contextControls}
      />

      <Modify id={id} controls={modifyControls} />
      <Remove id={id} controls={removeControls} />
    </ListCard>
  )
})
