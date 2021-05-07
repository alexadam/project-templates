import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import NoteEditor from './notes/editor';
import Notes from './notes/notes';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/note/:noteId">
            <NoteEditor />
          </Route>
          <Route exact path="/new">
            <NoteEditor />
          </Route>
          <Route exact path="/">
            <Notes />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

ReactDOM.render(
    <App />,
    document.getElementById('app') as HTMLElement
  );