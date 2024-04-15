import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { windowInfoState } from '@/state/atoms'

const App = () => {
  const setWindowInfo = useSetRecoilState(windowInfoState)

  const onResize = () => {
    setWindowInfo({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <RouterProvider router={router} />
}

export default App
