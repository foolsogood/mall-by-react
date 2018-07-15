import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import TitleBar from 'components/common-components/titleBar.js'

export default class Orders extends Component {
    constructor() {
        super()
        this.state = {

        }
    };

    render() {
        return (
            <div>
                <TitleBar   titleText="我的订单" />
                
            </div>
        )
    }
}
