import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './todoSlice'
import {Todo} from './types'

const AddTodo: React.FC = ({}) => {
    const dispatch = useDispatch()
    const [text, setText] = React.useState('')

    function handleChange(e: { target: HTMLInputElement; }) {
        setText(e.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (!text.trim()) {
            return
        }

        const newTodo : Todo = {
            id: Math.random().toString(36).substr(2, 9),
            completed: false,
            text: text,
        }

        dispatch(addTodo(newTodo))

        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={handleChange} />
            <button type="submit">Add Todo</button>
        </form>
    )
}
export default AddTodo
