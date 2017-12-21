import React from 'react';
import ReactDOM from 'react-dom';
import View3D from './view3d';
import './style.scss';

const App = (props) => (
    <div style={{width:'1000px', height:'1000px', backgroundColor:'#fff'}}>
        <View3D />
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
