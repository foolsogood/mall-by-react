import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'

export default class OrderItem extends Component {
    constructor() {
        super()
        this.state = {

        }
    };

    render() {
        const { order } = this.props
        return (
            <div className="order-item bg-fff pd-20">
                <Link to={`/orderDetail/${order.orderId}`}>
                    <Row>
                        <Col span={7}>
                            <img style={{ width: '1.5rem', height: '1.5rem' }} src={order.imgs[0]} alt="商品" />
                        </Col>
                        <Col span={12} >
                            <div >
                                <p>{order.goodName}</p>
                                <p className="good-itm-p-2">{order.desction}</p>
                            </div>
                        </Col>
                        <Col span={5}>
                            <div>
                                <span>¥{order.price * order.number}</span>
                            </div>
                        </Col>

                    </Row>
                </Link>
            </div>
        )
    }
}
