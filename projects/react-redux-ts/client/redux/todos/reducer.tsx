import { Todo, TodoList } from './model'
import { TodoActionTypes, ITodoAction } from "./actions";

const initalState: TodoList = {
    todos: []
}

export const todoReducer = (state: TodoList = initalState, action: ITodoAction) => {
    switch (action.type) {
        case TodoActionTypes.ADD_TODO:
            const newTodo: Todo = {
                id: Math.floor(Math.random() * 10000000000),
                text: action.todoText ?? "",
                isDone: false
            }
            return { todos: [...state.todos, newTodo] }
            break;
        case TodoActionTypes.REMOVE_TODO:
            return { todos: state.todos.filter( todo => todo.id !== action.todoId) }
            break;
        // TODO handle Toggle action
        default:
            return state
            break;
    }
}