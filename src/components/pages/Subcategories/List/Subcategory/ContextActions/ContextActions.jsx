import Categories from '../../../../../../assets/icons/categories.svg'
import Edit from '../../../../../../assets/icons/pen.svg'
import Delete from '../../../../../../assets/icons/trashcan.svg'
import { IconButton } from '../../../../../controls/buttons/IconButton'
import { ContextPopup } from '../../../../../ui/ContextPopup'
import { Gap } from '../../../../../ui/Gap'
import c from './ContextActions.module.scss'

export const ContextActions = ({
  handleSubcategories,
  handleModifyCategory,
  handleRemoveCategory,
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
          icon={Categories}
          label="Подкатегории"
          onClick={handler(handleSubcategories)}
        />
        <IconButton
          icon={Edit}
          label="Изменить"
          onClick={handler(handleModifyCategory)}
        />
        <IconButton
          icon={Delete}
          label="Удалить"
          onClick={handler(handleRemoveCategory)}
        />
      </Gap>
    </ContextPopup>
  )
}
