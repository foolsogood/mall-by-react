import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import TitleBar from 'components/common-components/titleBar.js'
// import xhr from 'service/xhr'
// import api from 'service/api'

export default class OrderDetail extends Component {
    constructor() {
        super()
        this.state = {
        }
    };
    componentDidMount() {
        // this._getHomeImgList()
    }
    _getHomeImgList() {
        const query = { userid: store.user.user.userid }
        xhr.get(api.order.getOrders, { query }).then(res => {
            if (res.code === '1') {
                this.setState({
                    orderList: res.data
                })
            }
        }).catch(err => { })
    };
    render() {
        return (
            <div>
                <TitleBar titleText="订单详情" />
                
            </div>
        )
    }
}

