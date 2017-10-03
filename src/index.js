
import React from 'react';
import ReactDOM from 'react-dom';
import xhr from './service/xhr'
// 组件
import App from './App';
// 样式
import 'antd/dist/antd.css'
import './static/style/public.css';
import './static/style/main.css';
import './static/js/reset.js'
// 
import store from './store'
React.$http = xhr;
ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root'));