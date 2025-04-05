import { useEffect } from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Skeleton.module.css'

const Skeleton = () => {
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)

  useEffect(() => {
    setHeaderTitle('')
  }, [])

  return (
    <div className={classes.Skeleton}>
      <div className={classes.line} />
      <div className={classes.line} />
      <div className={classes.line} />
      <div className={classes.container}>
        <div className={classes.block} />
        <div className={classes.block} />
        <div className={classes.block} />
      </div>
      <div className={classes.line} />
      <div className={classes.line} />
    </div>
  )
}

export default Skeleton