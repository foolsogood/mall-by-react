
import React, { Component } from 'react'
import { Row, Col, Rate } from 'antd'
export default class CommentItem extends Component {
    render() {
        const rate=this.props.rate
        return (
            <div className="comment-item">
                <Row>
                    <Col span={4}>
                        <img className="avatar-com" src={rate.avatar} alt="" />
                    </Col>
                    <Col span={20}>
                        <div className="flex-box flex-ju-c-bt">
                            <span>{rate.name}</span>
                            <Rate disabled defaultValue={parseFloat(rate.rateScore)} />
                        </div>
                        <p>{rate.time}</p>
                        <p>{rate.comment}</p>
                    </Col>
                </Row>
            </div>
        )
    }
}