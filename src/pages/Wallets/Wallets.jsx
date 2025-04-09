import { Button } from '../../components/controls/Button/Button'
import { Wallet } from './Wallet/Wallet'
import { Title } from '../../components/Title/Title'
import { Collapser } from '../../components/Collapser/Collapser'

import {createRef, lazy, useEffect, useRef, useState} from 'react'
import { useGlobalStore } from '../../hooks/useGlobalStore'

import classes from './Wallets.module.css'
import {Transition, TransitionGroup} from "react-transition-group";

// const ModifyWallet = lazy(() => import('./ModifyWallet/ModifyWallet'))

const AddWallet = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('./AddWallet/AddWallet')), 1000)
))

const Tasks = () => {
  const openModal = useGlobalStore(state => state.openModal)
  const setHeaderTitle = useGlobalStore(state => state.setHeaderTitle)
  const wallets = useGlobalStore(state => state.wallets.value)
  const [prevWallets, setPrevWallets] = useState(wallets)

  useEffect(() => {
    setHeaderTitle('Счета')
  }, [])

  useEffect(() => {
    setPrevWallets(wallets.map(wallet => ({
      ...wallet,
      isNew: !Boolean(prevWallets.filter(prevWallet => prevWallet.id === wallet.id).length)
    })))
  }, [wallets])

  const openAddWallet = async () => {
    await AddWallet
    openModal({
      title: 'Добавить счет',
      body: <AddWallet />,
      width: '350px'
    })
  }

  return (
    <>
      <TransitionGroup component="ul" className={classes.Wallets}>
        {prevWallets.map(({id, name, balance, main, isNew}) => {
          const liRef = createRef()
          const collapserRef = createRef()

          return (
            <Transition
              key={id}
              timeout={300}
              nodeRef={liRef}
              onExit={() => collapserRef?.current?.close()}
            >
              <li ref={liRef}>
                <Collapser ref={collapserRef} smoothAppear={isNew}>
                  <Wallet
                    id={id}
                    name={name}
                    balance={balance}
                    main={main}
                  />
                </Collapser>
              </li>
            </Transition>
          )
        })
        }
      </TransitionGroup>
      {!prevWallets.length && (
        <Title>Счетов не найдено</Title>
      )}
      <Button
        className={classes.addWalletButton}
        onClick={openAddWallet}
      >
        Добавить счет
      </Button>
    </>
  )
}

export default Tasks