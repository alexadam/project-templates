import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import mainReducer from '../reducers/reducer.js';
import Display from './display.js';
import Edit from './edit.js';

let store = createStore(mainReducer);

const Main = () => (
    <Provider store={store}>
        <div>
            <Edit />
            <Display />
        </div>
    </Provider>
);

export default Main;
