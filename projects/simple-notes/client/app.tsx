import React, {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

import MainView from './views/main';
import EditView from './views/edit'

import { ipcRenderer} from 'electron'

import './style.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  useEffect(() => {
    ipcRenderer.on('export', () => alert("export ON"));

    ipcRenderer.send("export", {message: "done"})
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/edit/:noteId">
            <EditView />
          </Route>
          <Route exact path="/new">
            <EditView />
          </Route>
          <Route exact path="/">
            <MainView />
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