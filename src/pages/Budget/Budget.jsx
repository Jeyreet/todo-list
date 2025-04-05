import { useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Budget.module.css'

const Budget = () => {
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)

  useEffect(() => {
    setHeaderTitle('Бюджет')
  }, []);

  return (
    <p>BUDGET</p>
  )
}

export default Budget