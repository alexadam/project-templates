import { configureStore, Action } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

export default store

