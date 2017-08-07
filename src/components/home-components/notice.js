import React, { Component } from 'react'
import { Row, Col } from 'antd'

export default class Notice extends Component {
    render() {
        return (
            <div className="notice ">
                <Row>
                    <Col span={4} className="flex-box">
                        <span className="mask">公告</span>
                    </Col>
                    <Col span={20}>
                        <p>小米商城欢迎您</p>
                    </Col>
                </Row>
            </div>
        )
    }
}
