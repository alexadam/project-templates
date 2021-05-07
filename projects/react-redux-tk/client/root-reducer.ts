import { combineReducers } from '@reduxjs/toolkit'
import Notes from './notes/slice'

const rootReducer = combineReducers({
    //...
  Notes
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer