import React from 'react'

interface TodoProps {
  completed: boolean
  text: string
  onClick: () => any
}

const TodoListItem: React.FC<TodoProps> = ({completed, text, onClick}: TodoProps) => {

    return (
        <li style={{textDecoration: completed ? 'line-through' : 'none'}} onClick={onClick}>
            {text}
        </li>
    )
}
export default TodoListItem