import { LSControls } from '../../../../../../stores/useLS'
import { Button } from '../../../../../controls/buttons/Button'
import { Actions } from '../../../../../ui/Actions'
import { Gap } from '../../../../../ui/Gap'
import { Popup } from '../../../../../ui/Popup'
import { Title } from '../../../../../ui/Title'
import c from './Remove.module.scss'

export const Remove = ({ id, controls }) => {
  const category = LSControls.getCategory(id)
  const removeCategory = LSControls.removeCategory

  const handleRemoveCategory = () => {
    removeCategory(id)
    controls.close()
  }

  return (
    <Popup controls={controls} maxWidth={320}>
      <Gap column>
        <Title>Удаление категории</Title>
        <p>Вы действительно хотите удалить категорию "{category.name}"?</p>
        <p>Это также удалит все вложенные категории и их операции</p>
        <Actions>
          <Button onClick={handleRemoveCategory}>Удалить</Button>
          <Button onClick={controls.close}>Отмена</Button>
        </Actions>
      </Gap>
    </Popup>
  )
}
