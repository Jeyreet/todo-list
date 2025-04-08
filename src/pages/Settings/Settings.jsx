import { useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Settings.module.css'
import {Button} from "../../components/controls/Button/Button.jsx";
import clsx from "clsx";
import {Title} from "../../components/Title/Title.jsx";
import {ThemeColorButton} from "./ThemeColorButton/ThemeColorButton.jsx";
import { AreaInput } from '../../components/controls/AreaInput/AreaInput'
import {useForm} from "react-hook-form";

const Settings = () => {
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)
  const importStorage = useGlobalStore(state => state.importStorage)
  const exportStorage = useGlobalStore(state => state.exportStorage)

  const themeColors = [
    ['ORANGE', 'Оранжевый'],
    ['RED', 'Красный'],
    ['BLUE', 'Синий'],
    ['PURPLE', 'Фиолетовый'],
    ['GREEN', 'Зеленый'],
    ['CYAN', 'Бирюзовый'],
    ['BLACK', 'Черный'],
  ]

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: ''
    }
  })

  const handleStorage = (data, e) => {
    if (e.nativeEvent.submitter.name === 'export') {
      const exportedStorage = exportStorage()

      setValue('data', exportedStorage)
      navigator.clipboard.writeText(exportedStorage)
    }
    else if (e.nativeEvent.submitter.name === 'import') {
      try {
        importStorage(data.data)
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    setHeaderTitle('Настройки')
  }, [])

  return (
    <>
      <Title>Акцентный цвет темы</Title>
      <div className={classes.themePicker}>
        {themeColors.map(([code, name], i) => (
          <ThemeColorButton key={code} code={code} name={name}/>
        ))}
      </div>
      <Title className={classes.marginTop}>Экспорт и импорт</Title>
      <form onSubmit={handleSubmit(handleStorage)}>
        <AreaInput
          name="data"
          label="Данные"
          control={control}
          className={classes.dataAreaInput}
        />
        <div className={classes.dataActions}>
          <Button type="submit" name="import">Импорт</Button>
          <Button type="submit" name="export">Экспорт</Button>
        </div>
      </form>
    </>
  )
}

export default Settings