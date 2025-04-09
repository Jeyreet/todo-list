import { Button } from '../../../components/controls/Button/Button'
import { TextInput } from '../../../components/controls/TextInput/TextInput'
import { AreaInput } from '../../../components/controls/AreaInput/AreaInput'
import { DateInput } from '../../../components/controls/DateInput/DateInput'

import { useForm } from 'react-hook-form'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import modalClasses from '../../../components/App/Modal/Modal.module.css'
import {NumberInput} from "../../../components/controls/NumberInput/NumberInput.jsx";
import {Switch} from "../../../components/controls/Switch/Switch.jsx";
import {useMemo} from "react";

const ModifyWallet = ({id}) => {
  const isModalOpen = useGlobalStore(state => state.isModalOpen)
  const closeModal = useGlobalStore(state => state.closeModal)
  const modifyWallet = useGlobalStore(state => state.modifyWallet)
  const {name, balance, main} = useMemo(() => useGlobalStore.getState().getWallet(id), [])

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: name,
      balance: balance,
      main: main
    }
  })

  const handleModifyWallet = ({name, balance, main}) => {
    modifyWallet({
      id,
      name,
      balance,
      main
    })
    closeModal()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleModifyWallet)}>
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
          <Button visualDisabled={!isValid} type="submit">Сохранить</Button>
          <Button onClick={closeModal} secondary>Отмена</Button>
        </div>
      </form>
    </>
  )
}

export default ModifyWallet