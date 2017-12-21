import React from 'react';
import ReactDOM from 'react-dom';
import Graph2D from './graph2d';
import './style.scss';

const data = [
    {x: 1, y: Math.random() * 100},
    {x: 2, y: Math.random() * 100},
    {x: 3, y: Math.random() * 100},
    {x: 4, y: Math.random() * 100},
    {x: 5, y: Math.random() * 100},
    {x: 6, y: Math.random() * 100},
    {x: 7, y: Math.random() * 100},
    {x: 8, y: Math.random() * 100},
    {x: 9, y: Math.random() * 100},
    {x: 10, y: Math.random() * 100},
];

const App = (props) => (
    <div>
        <Graph2D width='500' height='500' data={data}/>
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
