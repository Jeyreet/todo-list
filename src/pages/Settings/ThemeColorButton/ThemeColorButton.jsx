import { Button } from '../../../components/controls/Button/Button'

import { useGlobalStore } from '../../../hooks/useGlobalStore'

import clsx from 'clsx'
import classes from './ThemeColorButton.module.css'

export const ThemeColorButton = ({code, name}) => {
  const updateThemeColor = useGlobalStore(state => state.updateThemeColor)

  return (
    <Button onClick={() => updateThemeColor(code)} className={classes.ThemeColorButton}>
      <div className={clsx(classes.themeColor, classes[code.toLowerCase()])}></div>
      {name}
    </Button>
  )
}