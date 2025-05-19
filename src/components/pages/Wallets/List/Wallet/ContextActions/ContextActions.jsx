import Edit from '../../../../../../assets/icons/pen.svg'
import Delete from '../../../../../../assets/icons/trashcan.svg'
import { IconButton } from '../../../../../controls/buttons/IconButton'
import { ContextPopup } from '../../../../../ui/ContextPopup'
import { Gap } from '../../../../../ui/Gap'
import c from './ContextActions.module.scss'

export const ContextActions = ({
  handleModifyWallet,
  handleRemoveWallet,
  controls
}) => {
  const handler = (action = () => {}) => {
    return () => {
      controls.close()
      action()
    }
  }

  return (
    <ContextPopup controls={controls}>
      <Gap column>
        <IconButton
          icon={Edit}
          label="Изменить"
          onClick={handler(handleModifyWallet)}
        />
        <IconButton
          icon={Delete}
          label="Удалить"
          onClick={handler(handleRemoveWallet)}
        />
      </Gap>
    </ContextPopup>
  )
}
