import { selector } from 'recoil'
import { windowInfoState } from './atoms'

export const isMobileState = selector({
  key: 'isMobileState',
  get: ({ get }) => {
    const windowInfo = get(windowInfoState)

    return windowInfo.windowInnerWidth < 768
  },
})
