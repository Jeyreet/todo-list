import { Button } from '../../../components/controls/Button/Button'

import { lazy } from 'react'
import { useGlobalStore } from '../../../hooks/useGlobalStore'

import clsx from 'clsx'
import classes from './Wallet.module.css'
import dayjs from 'dayjs'

// const ModifyWallet = lazy(() => import('../ModifyWallet/ModifyWallet'))
//const RemoveWallet = lazy(() => import('../RemoveWallet/RemoveWallet'))

const ModifyWallet = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../ModifyWallet/ModifyWallet')), 1000)
))

const RemoveWallet = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../RemoveWallet/RemoveWallet')), 1000)
))

export const Wallet = ({id, name, balance, main}) => {
  const openModal = useGlobalStore(state => state.openModal)

  const openModifyWallet = async () => {
    await ModifyWallet
    openModal({
      title: 'Изменить',
      body: <ModifyWallet id={id} />,
      width: '350px'
    })
  }

  const openRemoveWallet = async () => {
    await RemoveWallet
    openModal({
      title: 'Удалить',
      body: <RemoveWallet id={id} />,
      maxWidth: '400px'
    })
  }

  return (
    <div className={classes.Wallet}>
      <div className={classes.info}>
        <h3 className={classes.name}>{name}</h3>
        <p>{
          (balance / 100).toLocaleString('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        } ₽</p>
        {main && <p>Основной</p>}
      </div>
      <div className={classes.actions}>
        <Button onClick={openModifyWallet}>Изменить</Button>
        <Button onClick={openRemoveWallet}>Удалить</Button>
      </div>
    </div>
  )
}