import { LSControls } from '../../../../../../stores/useLS'
import { Button } from '../../../../../controls/buttons/Button'
import { Actions } from '../../../../../ui/Actions'
import { Gap } from '../../../../../ui/Gap'
import { Popup } from '../../../../../ui/Popup'
import { Title } from '../../../../../ui/Title'
import c from './Remove.module.scss'

export const Remove = ({ id, controls }) => {
  const wallet = LSControls.getWallet(id)
  const removeWallet = LSControls.removeWallet

  const handleRemoveWallet = () => {
    removeWallet(id)
    controls.close()
  }

  return (
    <Popup controls={controls} maxWidth={320}>
      <Gap column>
        <Title>Удаление задачи</Title>
        <p>Вы действительно хотите удалить счет "{wallet.name}"?</p>
        <Actions>
          <Button onClick={handleRemoveWallet}>Удалить</Button>
          <Button onClick={controls.close}>Отмена</Button>
        </Actions>
      </Gap>
    </Popup>
  )
}
