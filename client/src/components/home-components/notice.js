import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Marquee from 'components/common/marquee'

export default class Notice extends Component {
    render() {
       
        const content = (
            <div>
                <p>欢迎来到小米商城</p>
                <p>5折优惠大酬宾</p>
            </div>
        )
        return (
            <div className="notice " style={{ padding: '0 .2rem' }}>
                <Row>
                    <Col span={4} className="flex-box">
                        <span className="mask">公告</span>
                    </Col>
                    <Col span={20}>
                        <div style={{
                            height: '.8rem',
                            overflow: 'hidden',
                            paddingLeft: ' .2rem'
                        }}>
                            <Marquee content={content}
                            speed={100}
                                fontSize=".25rem"
                                backgroundColor="#fff"
                            />
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}
