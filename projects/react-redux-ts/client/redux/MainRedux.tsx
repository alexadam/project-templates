import React from 'react'
import TodoComponent from './components/Todo'
import TodoList from './components/TodoList'
import AddTodoComponent from './components/AddTodo'

import { createStore } from "redux";
import { Provider } from 'react-redux';
import  {todoReducer} from './todos/reducer'

const MainReduxApp: React.FC<{}> = () => {

    const store = createStore(todoReducer)

    return (
        <Provider store={store}>
            Main redux app
            <TodoList />
            <AddTodoComponent />
        </Provider>
    )
}

export default MainReduxApp