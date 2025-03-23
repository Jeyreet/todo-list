import classes from './Skeleton.module.css'
import { useEffect } from 'react'
import { useApp } from '../../components/App/AppContext.jsx'

const Skeleton = () => {
  const {setHeaderTitle} = useApp()

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