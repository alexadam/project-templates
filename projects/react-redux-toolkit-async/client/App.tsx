import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import { loadTodos } from './features/todoList/todoSlice'
import { useDispatch } from 'react-redux';

import AddTodo from './features/todoList/addTodo'
import TodoList from './features/todoList/TodoList'
import Footer from './features/visibilityFilter/footer'

const App: React.FC = ({}) => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.location.pathname === '/'){
      dispatch(loadTodos());
    }
  }, [dispatch]);

  return (
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('app') as HTMLElement
  );