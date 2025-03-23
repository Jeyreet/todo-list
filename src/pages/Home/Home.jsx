import classes from './Home.module.css'
import { useEffect } from 'react'
import { useApp } from '../../components/App/AppContext.jsx'

const Home = () => {
  const {setHeaderTitle} = useApp()

  useEffect(() => {
    setHeaderTitle('Главная')
  }, [])

  return (
    <p>HOME</p>
  )
}

export default Home