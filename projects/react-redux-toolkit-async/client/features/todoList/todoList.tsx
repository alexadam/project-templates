import React from 'react'
import TodoListItem from './TodoListItem'
import { RootState } from '../../rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo } from './todoSlice'

import { FilterModes } from '../visibilityFilter/visibilityFilterSlice'
import { Todo } from './types'

const getVisibleTodos = (todos: Todo[], filter: FilterModes) => {
    switch (filter) {
        case FilterModes.ShowAll:
            return todos
        case FilterModes.ShowCompleted:
            return todos.filter(t => t.completed)
        case FilterModes.ShowActive:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const TodoList: React.FC = () => {
    const dispatch = useDispatch();

    const todos = useSelector((state: RootState) => getVisibleTodos(state.todos, state.visibilityFilter))

    return (
        <ul>
            {todos.map(todo => (
                <TodoListItem key={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo))} />
                // is equivalent to:
                // <TodoListItem key={todo.id} id={todo.id} completed={todo.completed} text={todo.text} />
            ))}
        </ul>
    )
}
export default TodoList