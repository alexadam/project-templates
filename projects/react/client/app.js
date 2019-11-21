import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

const App = (props) => (
    <div>
        <h1>Hello World</h1>
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
