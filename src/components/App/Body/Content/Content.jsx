import {lazy, Suspense} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import Skeleton from '../../../../pages/Skeleton/Skeleton.jsx'
import classes from './Content.module.css'

// const Home = lazy(() => import('../../pages/Home/Home'))
// const Tasks = lazy(() => import('../../pages/Tasks/Tasks'))
// const Budget = lazy(() => import('../../pages/Budget/Budget'))
// const Wallets = lazy(() => import('../../pages/Wallets/Wallets'))
// const Settings = lazy(() => import('../../pages/Settings/Settings'))

const Home = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Home/Home.jsx')), 1000)
))
const Tasks = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Tasks/Tasks.jsx')), 1000)
))
const Budget = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Budget/Budget.jsx')), 1000)
))
const Wallets = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Wallets/Wallets.jsx')), 1000)
))
const Settings = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Settings/Settings.jsx')), 1000)
))

export const Content = () => {
  const location = useLocation()

  return (
    <div className={classes.Content}>
      <Suspense key={location.pathname} fallback={<Skeleton />}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  )
}