import { useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Settings.module.css'

const Settings = () => {
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)

  useEffect(() => {
    setHeaderTitle('Настройки')
  }, [])

  return (
    <p>SETTINGS</p>
  )
}

export default Settings