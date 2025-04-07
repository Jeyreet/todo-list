import { useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Settings.module.css'
import {Button} from "../../components/controls/Button/Button.jsx";
import clsx from "clsx";
import {Title} from "../../components/Title/Title.jsx";
import {ThemeColorButton} from "./ThemeColorButton/ThemeColorButton.jsx";

const Settings = () => {
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)

  const themeColors = [
    ['ORANGE', 'Оранжевый'],
    ['RED', 'Красный'],
    ['BLUE', 'Синий'],
    ['PURPLE', 'Фиолетовый'],
    ['GREEN', 'Зеленый'],
    ['CYAN', 'Бирюзовый'],
    ['BLACK', 'Черный'],
  ]

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
    </>
  )
}

export default Settings