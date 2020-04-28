import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import TodoComponent from './Todo'

import  {Todo, TodoList} from '../todos/model'


const mapStateToProps = (state: any) => {
    return { todos: state.todos};
}

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface TodoListProps extends PropsFromRedux {

}

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {

    const allTodos = props.todos.map( (todo: Todo) => <TodoComponent {...todo} key={todo.id}/>)

    return (
        <div>
            {allTodos}
        </div>
    )
}

export default connector(TodoList)