
export enum TodoActionTypes {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
    TOGGLE_TODO
}

export interface ITodoAction {
    type: TodoActionTypes
    todoText?: string
    todoId?: number
}

export function addTodo(todoText: string): ITodoAction {
    return {
        type: TodoActionTypes.ADD_TODO,
        todoText: todoText
    }
}

export function updateTodo(todoId: number, todoText: string): ITodoAction {
    return {
        type: TodoActionTypes.UPDATE_TODO,
        todoText: todoText,
        todoId: todoId
    }
}

export function removeTodo(todoId: number): ITodoAction {
    return {
        type: TodoActionTypes.REMOVE_TODO,
        todoId: todoId
    }
}

export function toggleTodo(todoId: number): ITodoAction {
    return {
        type: TodoActionTypes.TOGGLE_TODO,
        todoId: todoId
    }
}