import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import WithHeader from 'components/common-components/withHeader'

// 
@WithHeader({ titleText: '订单详情' })

 class OrderDetail extends Component {
    constructor() {
        super()
        this.state = {
        }
    };
    componentDidMount() {
        // this.getHomeImgList()
    }
    getHomeImgList() {
        const query = { userid: store.user.user.userid }
        const url = $api.order.getOrders
        $apiServer.get(url, { query })
            .then($preAjaxHandler.call(this))
            .then(res => {
                this.setState({
                    orderList: res.data
                })
            }).catch($commonErrorHandler.apply(this, [url]))

    };
    render() {
        return (
            <div>

            </div>
        )
    }
}
export default OrderDetail

