import {lazy, Suspense} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import Skeleton from '../../../../pages/Skeleton/Skeleton.jsx'
import classes from './Content.module.css'

// const HomePage = lazy(() => import('../../pages/Home/Home'))
// const TasksPage = lazy(() => import('../../pages/Tasks/Tasks'))
// const BudgetPage = lazy(() => import('../../pages/Budget/Budget'))
// const SettingsPage = lazy(() => import('../../pages/Settings/Settings'))

const HomePage = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Home/Home.jsx')), 1000)
))
const TasksPage = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Tasks/Tasks.jsx')), 1000)
))
const BudgetPage = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Budget/Budget.jsx')), 1000)
))
const SettingsPage = lazy(() => new Promise(resolve =>
  setTimeout(() => resolve(import('../../../../pages/Settings/Settings.jsx')), 1000)
))

export const Content = () => {
  const location = useLocation()

  return (
    <div className={classes.Content}>
      <Suspense key={location.pathname} fallback={<Skeleton />}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  )
}