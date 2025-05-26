import { useMemo } from 'react'

import { useLS } from '../../../../stores/useLS'
import { makePrecision } from '../../../../utils/precision'
import { Title } from '../../../ui/Title'
import c from './Wallets.module.scss'

export const Wallets = () => {
  const wallets = useLS(state => state.wallets)

  const amount = useMemo(
    () => wallets.reduce((amount, wallet) => amount + wallet.balance, 0),
    [wallets]
  )

  return (
    <>
      <Title indent>Счета</Title>
      {wallets.length > 0 ? (
        <p>Баланс всех счетов: {makePrecision(amount, 2)}</p>
      ) : (
        <p>Счетов не найдено</p>
      )}
    </>
  )
}
