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
        return (
            <div className="order-item pd-20">
               <Row>
                   <Col span={7}>
                   <img style={{width:'1.5rem',height:'1.5rem'}} src={require('assets/img/avatar.jpg')} alt="商品"/>
                   </Col>
                   <Col span={12} >
                   <div >
                   <p>dsmvdvmsadgddh</p>
                   <p className="good-itm-p-2">dsmvdvmsadgddhfetdefdkedffdjhedeufgk</p>
                   </div>
                   </Col>
                   <Col span={5}>
                   <div>
                   <span>¥200</span>
                   </div>
                   </Col>
                   
               </Row>
            </div>
        )
    }
}
