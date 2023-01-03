import * as React from 'react';
import ReactDOM from "react-dom/client";
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

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);