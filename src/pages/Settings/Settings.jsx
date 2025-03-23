import classes from './Settings.module.css'
import { useEffect } from 'react'
import { useApp } from '../../components/App/AppContext.jsx'

const Settings = () => {
  const {setHeaderTitle} = useApp()

  useEffect(() => {
    setHeaderTitle('Настройки')
  }, [])

  return (
    <p>SETTINGS</p>
  )
}

export default Settings