import React, {useState} from 'react'
import {addTodo} from '../todos/actions'

import { connect, ConnectedProps } from "react-redux";


// const mapStateToProps = (state: any) => {
//     return { articles: state.articles };
//   };

const mapDispatchToProps = (dispatch: any) => {
    return {
      addTodo: (todoText: string) => dispatch(addTodo(todoText))
    };
  }

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface AddTodoProps extends PropsFromRedux {
}

const AddTodoComponent: React.FC<AddTodoProps> = (props: AddTodoProps) => {

    const [todoText, setTodoText] = useState('')

    const addTodo = () => {
        props.addTodo(todoText)
    }

    return (
        <div>
            <input type="text" value={todoText} onChange={e => setTodoText(e.target.value)} />
            <button onClick={addTodo}>Add</button>
        </div>
    )
}

export default connector(AddTodoComponent)

// const mapStateToProps = (state: any) => {
//     return { articles: state.articles };
//   };

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//       addTodo: (todoText: string) => dispatch(addTodo(todoText))
//     };
//   }

// export default connect(null, mapDispatchToProps)(AddTodoComponent)