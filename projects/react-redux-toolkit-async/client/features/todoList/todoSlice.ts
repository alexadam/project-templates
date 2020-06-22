import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, AppDispatch } from '../../store'
import { loadRemoteTodos, saveRemoteTodos } from '../../api/jsonstore'
import { Todo } from './types'
import { RootState } from '../../rootReducer'

const initialState: Todo[] = []

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        loadTodos(state, action: PayloadAction<Todo[]>) {
            return action.payload
        },
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

export const { toggleTodo /*, addTodo - if no async*/ } = todoSlice.actions

export const loadTodos = (): AppThunk => async (dispatch: AppDispatch) => {    
    const todos = await loadRemoteTodos()    
    dispatch(todoSlice.actions.loadTodos(todos))
}

export const addTodo = (text: string): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
    const newTodo: Todo = {
        id: Math.random().toString(36).substr(2, 9),
        completed: false,
        text: text,
    }
    dispatch(todoSlice.actions.addTodo(newTodo))
    saveRemoteTodos(getState().todos);
}

export default todoSlice.reducer