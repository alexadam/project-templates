import { configureStore, Action } from '@reduxjs/toolkit'

import rootReducer, { RootState } from './root.reducer'

const store = configureStore({
  reducer: rootReducer,
})

export default store