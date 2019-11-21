import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'

import SelectShape from './shapes/selectshape';
import SelectShapeReducer from './shapes/selectshape-reducer';
import View3D from './view3d/view3d';
import View3DReducer from './view3d/view3d-reducer';

let store = createStore(combineReducers({
    SelectShapeReducer,
    View3DReducer,
}));

const Main = () => (
    <Provider store={store}>
        <div>
            <SelectShape />
            <View3D />
        </div>
    </Provider>
);

export default Main;
