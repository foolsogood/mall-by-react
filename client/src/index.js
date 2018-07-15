
import React from 'react';
import ReactDOM from 'react-dom';
// 组件
import App from './App';
// 样式
import 'antd/dist/antd.css'
// // 
import store from './store'
ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root'));