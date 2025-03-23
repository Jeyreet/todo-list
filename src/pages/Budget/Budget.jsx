import classes from './Budget.module.css'
import { useEffect } from 'react'
import { useApp } from '../../components/App/AppContext.jsx'

const Budget = () => {
  const {setHeaderTitle} = useApp()

  useEffect(() => {
    setHeaderTitle('Бюджет')
  }, []);

  return (
    <p>BUDGET</p>
  )
}

export default Budget