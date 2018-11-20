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
        this.getOrderDetail()
    }
    getOrderDetail() {
        const url = $api.order.getOrderDetail
        const {orderId}=this.props.match.params;
        const params=[orderId]
            
		$apiServer.get(url,{params})
			
			.then(res => {
				// this.setState({
				// })
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

