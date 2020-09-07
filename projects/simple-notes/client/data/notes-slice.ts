import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {INoteData} from "./data-model"

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
            let atIndex = state.findIndex(snippet => snippet.id === action.payload.id)
            if (atIndex > -1) {
                // update if existing
                state[atIndex] = action.payload
            } else {
                // add new
                state.push(action.payload)
            }
        },
        removeNote(state, action: PayloadAction<INoteData>) {
            let atIndex = state.findIndex(snippet => snippet.id === action.payload.id)
            state.splice(atIndex, 1)            
        },
    }
})

export const { addNote, removeNote } = notesSlice.actions

export default notesSlice.reducer
