import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const ViewItems = lazy(() => import('../components/views/items/ViewItems'))
const ViewCart = lazy(() => import('../components/views/cart/ViewCart'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <ViewItems />,
  },
  {
    path: '/cart',
    element: <ViewCart />,
  },
])

export default router
