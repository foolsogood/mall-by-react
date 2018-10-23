import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
//公共组件
import WithFooter from 'components/common-components/withFooter'

import RecomList from 'components/home-components/recommend/recomList'
@WithFooter
 class CartEmpty extends Component {

    render() {
        return (
            <div>

                <div className="flex-box">
                    <div className="empty-cart">
                        <Row>
                            <Col span={6}>
                            <span className="iconfont icon-gouwuche" style={{color:'#8a8a8a',fontSize:'.6rem'}}></span>
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