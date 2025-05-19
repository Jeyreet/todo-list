import { memo, useMemo } from 'react'

import { useLS } from '../../../../stores/useLS'
import { numberSort } from '../../../../utils/numberSort'
import { stringsSort } from '../../../../utils/stringsSort'
import { Collapser } from '../../../ui/Collapser'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'
import { Title } from '../../../ui/Title'
import c from './List.module.scss'
import { Wallet } from './Wallet'

const sortHandlers = {
  id: numberSort('id'),
  name: stringsSort('name'),
  balance: numberSort('balance')
}

export const List = memo(({ sort }) => {
  const wallets = useLS(state => state.wallets)

  const sortedWallets = useMemo(
    () => sortHandlers[sort?.field ?? 'id'][sort?.order ?? 'desc'](wallets),
    [wallets, sort]
  )

  return (
    <DelayedUnmount timeout={500}>
      {wallets.length === 0 && (
        <Collapser>
          <Title center indent>
            Счетов не найдено
          </Title>
        </Collapser>
      )}
      {sortedWallets.map(wallet => (
        <Collapser key={wallet.id}>
          <Wallet wallet={wallet} />
        </Collapser>
      ))}
    </DelayedUnmount>
  )
})
