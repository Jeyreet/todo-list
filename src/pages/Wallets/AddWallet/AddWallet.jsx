import { Button } from '../../../components/controls/Button/Button'
import { TextInput } from '../../../components/controls/TextInput/TextInput'
import { AreaInput } from '../../../components/controls/AreaInput/AreaInput'
import { DateInput } from '../../../components/controls/DateInput/DateInput'

import { useForm } from 'react-hook-form'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import modalClasses from '../../../components/App/Modal/Modal.module.css'
import {NumberInput} from "../../../components/controls/NumberInput/NumberInput.jsx";
import {Switch} from "../../../components/controls/Switch/Switch.jsx";

const AddWallet = () => {
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const closeModal = useGlobalStore(state => state.closeModal)
  const addWallet = useGlobalStore(state => state.addWallet)

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })

  const handleAddWallet = ({name, balance, main}) => {
    addWallet({
      name,
      balance,
      main
    })
    closeModal()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleAddWallet)}>
        <div className={modalClasses.scroller}>
          <TextInput
            name="name"
            label="Название"
            rules={{ required: 'обязательное' }}
            autoFocus={isModalOpen}
            control={control}
          />
          <NumberInput
            name="balance"
            label="Баланс"
            precision={2}
            control={control}
          />
          <Switch
            name="main"
            label="Сделать основным"
            control={control}
          />
        </div>
        <div className={modalClasses.actions}>
          <Button visualDisabled={!isValid} type="submit">Добавить</Button>
          <Button onClick={closeModal} secondary>Отмена</Button>
        </div>
      </form>
    </>
  )
}

export default AddWallet