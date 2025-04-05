import { useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Home.module.css'

const Home = () => {
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)

  useEffect(() => {
    setHeaderTitle('Главная')
  }, [])

  return (
    <p>HOME</p>
  )
}

export default Home