// import { Todo, TodoList } from './model'
// import { TodoActionTypes, ITodoAction } from "./actions";

// const initalState: TodoList = {
//     todos: []
// }

// export const todoReducer = (state: TodoList = initalState, action: ITodoAction) => {
//     switch (action.type) {
//         case TodoActionTypes.ADD_TODO:
//             const newTodo: Todo = {
//                 id: Math.floor(Math.random() * 10000000000),
//                 text: action.todoText ?? "",
//                 isDone: false
//             }
//             return { todos: [...state.todos, newTodo] }
//             break;
//         case TodoActionTypes.REMOVE_TODO:
//             return { todos: state.todos.filter( todo => todo.id !== action.todoId) }
//             break;
//         // TODO handle Toggle action
//         default:
//             return state
//             break;
//     }
// }


import { ApiData } from '../api-model/api-model'
import { IApiAction, ApiModelActionTypes} from "../api-model/actions";

const initalState: ApiData = {
    data: null,
    error: null,
    isWaitingData: false
}

export const todoReducer = (state: ApiData = initalState, action: IApiAction) => {
    switch (action.type) {
        case ApiModelActionTypes.API_CALL_REQUEST:
            return {data: null, error: null, isWaitingData: true}
        case ApiModelActionTypes.API_CALL_SUCCESS:
            return {data: action.data, error: null, isWaitingData: false}
        case ApiModelActionTypes.API_CALL_FAILURE:
            return {data: null, error: action.error, isWaitingData: false}
        default:
            return state
            break;
    }
}
