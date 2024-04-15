import { selector } from 'recoil'
import { windowInfoState } from './atoms'

export const refinedWindowInfoState = selector({
  key: 'refinedWindowInfoState',
  get: ({ get }) => {
    const windowInfo = get(windowInfoState)

    console.log(windowInfo)

    return windowInfo
  },
})
