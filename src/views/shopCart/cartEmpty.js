import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
//公共组件

import Footer from '../../components/common-components/footer.js'
import RecomList from '../../components/home-components/recommend/recomList'
import cart0 from '../../static/img/cart-0.png'
export default class CartEmpty extends Component {

    render() {
        return (
            <div>

                <div className="flex-box">
                    <div className="empty-cart">
                        <Row>
                            <Col span={6}><img className="icon" src={cart0} alt="" /></Col>
                            <Col span={11} >
                                <span >购物车还是空的</span>
                            </Col>
                            <Col span={7} >
                                <Link to={`/classify`}>
                                    <div className="flex-box">
                                        <span className="mask">去逛逛</span>
                                    </div>

                                </Link>

                            </Col>
                        </Row>
                    </div>
                </div>
                <RecomList titleText="为你推荐" />
                <Footer />
            </div>
        )
    }
}