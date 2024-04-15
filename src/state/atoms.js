import { atom } from 'recoil'

export const windowInfoState = atom({
  key: 'windowInfoState',
  default: {
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
  },
})
