import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default AppLayout
