import { lazy, memo, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Scroller } from '../../../controls/Scroller'
import { DelayedUnmount } from '../../../ui/DelayedUnmount'
import { Loader } from '../../../ui/Loader'
import c from './Content.module.scss'

const Home = lazy(() =>
  import('../../../pages/Home').then(module => ({ default: module.Home }))
)

const Tasks = lazy(() =>
  import('../../../pages/Tasks').then(module => ({ default: module.Tasks }))
)

const Wallets = lazy(() =>
  import('../../../pages/Wallets').then(module => ({ default: module.Wallets }))
)

const Settings = lazy(() =>
  import('../../../pages/Settings').then(module => ({
    default: module.Settings
  }))
)

export const Content = memo(() => {
  return (
    <Scroller
      className={c.Content}
      cs={{ scroller: c.scroller, inner: c.inner }}
    >
      <DelayedUnmount>
        <Suspense fallback={<Loader shown={true} />}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </DelayedUnmount>
    </Scroller>
  )
})
