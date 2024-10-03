import { configureStore } from '@reduxjs/toolkit'
import groupReducer from '../slice/group/group'
export const store = configureStore({
  reducer: {
    groups: groupReducer,
  },
})