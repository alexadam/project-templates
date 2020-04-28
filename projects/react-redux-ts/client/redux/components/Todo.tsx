import React, {useState} from 'react'
import {Todo} from '../todos/model'
import {updateTodo, removeTodo, toggleTodo} from '../todos/actions'

import { connect, ConnectedProps } from "react-redux";


const mapDispatchToProps = (dispatch: any) => {
    return {
      updateTodo: (todoId: number, todoText: string) => dispatch(updateTodo(todoId, todoText)),
      removeTodo: (todoId: number) => dispatch(removeTodo(todoId)),
      toggleTodo: (todoId: number) => dispatch(toggleTodo(todoId)),
    };
  }

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface TodoProps extends Todo, PropsFromRedux {
}

const TodoComponent: React.FC<TodoProps> = (props: TodoProps) => {

    const [text, setText] = useState(props.text)

    const onTextChange = (newText: string) => {
        setText(newText)
    }

    const toggleTodo = () => {
        // TODO
        props.toggleTodo(props.id)
    }

    const onRemoveTodo = () => {
        props.removeTodo(props.id)
    }

    return (
        <div>
            <input type="checkbox"/>
            <input type="text" value={text} onChange={e => onTextChange(e.target.value)} />
            <button onClick={onRemoveTodo}>Remove</button>
        </div>
    )
}

export default connector(TodoComponent)