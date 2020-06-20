import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from './types'

const initialState : Todo[] = []

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.push(action.payload);
        },
        toggleTodo(state, action: PayloadAction<Todo>) {
            let todo = state.find(todo => todo.id === action.payload.id);

            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    }
})

export const { toggleTodo, addTodo } = todoSlice.actions
// ERROR - Actions must be plain objects. Use custom middleware for async actions.
// export const addTodo = (text: string) => {
//     const newTodo : Todo = {
//         id: Math.random().toString(36).substr(2, 9),
//         completed: false,
//         text: text,
//     }
//     todoSlice.actions.addTodo(newTodo)
// }

export default todoSlice.reducer