import React, { Component } from 'react'
import { Row, Col } from 'antd'
import CartItem from 'components/cart-components/cartItem'
import { Link } from 'dva/router';
import PropTypes from 'prop-types'
import {connect} from 'dva';
@connect(({shopCart})=>({shopCart}))
class cartList extends Component {
    render() {
        const {shopCart}=this.props
        return (
            <div>
                {/*用商品id而不是数组的索引来做key,会更好检测数据变更  */}
                {
                    Object.values(shopCart.cart).map((item) => {
                        return <CartItem key={item.goodId} cartItem={item} />
                    })
                }
                <div className="tip bg-fff">
                    <p>温馨提醒：产品是否购买成功,以最终下单为准,请尽快结算</p>
                </div>
                <div className="cart-footer bg-fff">
                    <Row className="flex-box">

                        <Col span={8} >
                            <div className="flex-box flex-ver-box">
                                <span >共
                                {
                                        shopCart.cartTotalNum
                                    }
                                    件,金额:</span>
                                <span><span className="price">
                                    {
                                        shopCart.cartTotalPrice
                                    }
                                </span>元</span>
                            </div>
                        </Col>
                        <Col span={8} className=" btn-1">
                            <div className="flex-box">
                                <Link to={`/classify`}>继续购物</Link>
                            </div>
                        </Col>
                        <Col span={8} className=" bg-org color-fff btn-2">
                            <div className="flex-box">

                                <Link to={`/balance`} className="color-fff">去结算</Link>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
cartList.propTypes={
    dispatch:PropTypes.func,
    shopCart:PropTypes.object,
}
export default (cartList)