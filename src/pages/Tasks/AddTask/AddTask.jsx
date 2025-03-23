import classes from './AddTask.module.css'
import modalClasses from '../../../components/Modal/Modal.module.css'
import {Button} from '../../../components/buttons/Button/Button'
import { useApp } from '../../../components/App/AppContext'
import clsx from 'clsx'
import {TextInput} from '../../../components/inputs/TextInput/TextInput'

const AddTask = () => {
  const {closeModal} = useApp()

  return (
    <div className={clsx(modalClasses.inner, classes.AddTask)}>
      <h2 className={modalClasses.title}>Добавление задачи</h2>
      <TextInput placeholder="Название" autoFocus />
      <TextInput placeholder="Название" />
      <div className={modalClasses.actions}>
        <Button onClick={closeModal}>Добавить</Button>
        <Button onClick={closeModal}>Отмена</Button>
      </div>
    </div>
  )
}

export default AddTask