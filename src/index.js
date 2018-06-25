
import React from 'react';
import ReactDOM from 'react-dom';
// 组件
import App from './App';
// 样式
import 'antd/dist/antd.css'
import './static/style/public.css';
import './static/style/main.css';
import './static/js/reset.js'
// 
import store from './store'
ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root'));