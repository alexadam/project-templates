import React from 'react'
import DisplayApiData from './api-components/display-api-data'

import { createStore, applyMiddleware, compose  } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from 'react-redux';

import  {apiDataReducer} from './api-model/reducer'
import rootSaga from "./sagas/api-saga";


const MainReduxApp: React.FC<{}> = () => {
    
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(apiDataReducer, applyMiddleware(sagaMiddleware))

    sagaMiddleware.run(rootSaga);

    return (
        <Provider store={store}>
            Main redux app
            <DisplayApiData />
        </Provider>
    )
}

export default MainReduxApp