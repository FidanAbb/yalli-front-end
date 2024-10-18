import { configureStore } from '@reduxjs/toolkit'
import groupReducer from '../slice/group/group'
import eventReducer from '../slice/event/event'
export const store = configureStore({
  reducer: {
    groups: groupReducer,
    events: eventReducer,
  },
})