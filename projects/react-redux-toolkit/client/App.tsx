import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

import AddTodo from './features/todoList/addTodo'
import TodoList from './features/todoList/TodoList'
import Footer from './features/visibilityFilter/footer'

ReactDOM.render(
  <Provider store={store}>
    <AddTodo />
    <TodoList />
    <Footer />
  </Provider>,
    document.getElementById('app') as HTMLElement
  );