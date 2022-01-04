import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import NoteEditor from './notes/editor';
import Notes from './notes/notes';
import './app.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/new" element={<NoteEditor />} />
          <Route path="/note/:noteId" element={<NoteEditor />} />
        </Routes>
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement
);