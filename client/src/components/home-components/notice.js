import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Marquee from 'react-upward-marquee'
export default class Notice extends Component {
    constructor() {
        super()
        this.state = {
            arr: [
                {
                    content: "欢迎来到小米商城",
                    time:1.5
                },
                {
                    content: "5折优惠大酬宾",
                    time:3
                }

            ]
        }
    };
    render() {
        return (
            <div className="notice ">
                <Row>
                    <Col span={4} className="flex-box">
                        <span className="mask">公告</span>
                    </Col>
                    <Col span={20}>
                        <div style={{
                            height:'.8rem',
                            overflowY:'hidden'
                        }}>
                            <Marquee data={this.state.arr}
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
