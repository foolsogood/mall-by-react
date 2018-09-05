
import React from 'react';
import ReactDOM from 'react-dom';
// 组件
import App from './App';
// 样式
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css'; 
// // 
import store from './store'
import middleware from 'utils/middleware'
import apiServer from 'service/apiServer'
import api from 'service/api'

window.$apiServer=apiServer
window.$api=api
Object.keys(middleware).forEach(item=>{
    window[`$${item}`]=middleware[item]
})
ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root'));