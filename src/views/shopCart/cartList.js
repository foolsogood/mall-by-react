import React, { Component } from 'react'
import { Row, Col } from 'antd'
import CartItem from '../../components/cart-components/cartItem'
import { Link } from 'react-router-dom'
//引入mobx相关
import { observer } from 'mobx-react'
import store from '../../store'
//图标
// import Circle0 from '../../static/img/circle-0.png'
// import Circle1 from '../../static/img/circle-1.png'
const cart = observer(class cartList extends Component {
    render() {
        return (
            <div>
                {/*用商品id而不是数组的索引来做key,会更好检测数据变更  */}
                {
                    Object.keys(store.shopCart.cart).map((item, idx) => {
                        return <CartItem key={store.shopCart.cart[item].id} cartItem={store.shopCart.cart[item]} />
                    })
                }
                <div className="tip bg-fff">
                    <p>温馨提醒：产品是否购买成功,以最终下单为准,请尽快结算</p>
                </div>
                <div className="cart-footer bg-fff">
                    <Row className="flex-box">
                       
                        <Col span={8} className="flex-box flex-ver-box">
                            <span>共
                                {
                                    store.shopCart.cartTotalNum === store.balance.balanceNum
                                        ? store.shopCart.cartTotalNum
                                        : store.balance.balanceNum
                                }
                                件,金额:</span>
                            <span><span className="price">
                                {
                                    store.shopCart.cartTotalNum === store.balance.balanceNum
                                        ? store.shopCart.cartTotalPrice
                                        : store.balance.balancePrice
                                }
                            </span>元</span>
                        </Col>
                        <Col span={8} className="flex-box btn-1">
                            <Link to={`/classify`}>继续购物</Link>
                        </Col>
                        <Col span={8} className="flex-box bg-org color-fff btn-2">
                            <Link to={`/balance`} className="color-fff">去结算</Link>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
})
export default cart