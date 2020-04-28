
export interface Todo {
    id: number
    text: string
    isDone: boolean
}

export interface TodoList {
    todos: Array<Todo>
}

