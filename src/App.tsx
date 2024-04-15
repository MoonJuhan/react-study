import { RouterProvider } from 'react-router-dom'
import router from './router'
import { windowInfoState } from '@/state/atoms'

const App = () => {
  return <RouterProvider router={router} />
}

export default App
