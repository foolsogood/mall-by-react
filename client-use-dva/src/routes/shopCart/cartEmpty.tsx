import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'dva/router'
//公共组件
import WithFooter from 'components/hocs/withFooter'

import RecomList from '../home/components/recommend/recomList'
import Iconfont from 'components/iconfont/index'

@WithFooter
class CartEmpty extends Component {

    render() {
        return (
            <div style={{ paddingBottom: '.6rem' }}>

                <div className="flex-box">
                    <div className="empty-cart">
                        <Row>
                            <Col span={6}>
                                <Iconfont name="gouwuche" color="#8a8a8a" size={30} />

                            </Col>
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
            </div>
        )
    }
}
export default CartEmpty