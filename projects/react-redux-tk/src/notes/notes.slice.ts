import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INoteData } from "./notes.model"

const initialState: INoteData[] = [{
  id: "note" + (Math.random() * 1000000),
  title: "Test note",
  content: "test"
}]

const notesSlice = createSlice({
  name: 'Notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<INoteData>) {
      state.push(action.payload)
    },
    updateNote(state, action: PayloadAction<INoteData>) {
      let atIndex = state.findIndex(snippet => snippet.id === action.payload.id)
      state[atIndex] = action.payload
    },
    removeNote(state, action: PayloadAction<INoteData>) {
      let atIndex = state.findIndex(snippet => snippet.id === action.payload.id)
      state.splice(atIndex, 1)
    },
  }
})

export const { addNote, updateNote, removeNote } = notesSlice.actions

export default notesSlice.reducer