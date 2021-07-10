import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithRedux from './App';
import {store} from './state/store';
import {Provider} from 'react-redux';

ReactDOM.render(

    <AppWithRedux />,

    document.getElementById('root'));
