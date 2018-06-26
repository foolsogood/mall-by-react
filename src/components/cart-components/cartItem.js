import React, { Component } from 'react'
import { Row, Col } from 'antd'

//引入mobx相关
import { observer } from 'mobx-react'
import store from '../../store'
const cartItem = observer(class cartItem extends Component {
    constructor() {
        super()
        this.state = {
            ifChecked: true

        }
    };
    //切换是否选中该商品
    _toggleCheck(goodId, event) {
        if (this.state.ifChecked) {
            this.setState({
                ifChecked: false
            })
            store.balance.popThisFromBalance(goodId, true)
        } else {
            this.setState({
                ifChecked: true
            })
            store.balance.popThisFromBalance(goodId, false)
        }
    };

    _changeNum(num, goodId, way, event) {

        if (way > 0) {
            store.shopCart.changeNum(goodId, way)
            store.balance.changeBalanceNum(goodId, way)
        } else if (way < 0) {
            if (num === 0) {
                return
            } else {
                store.shopCart.changeNum(goodId, way)
                store.balance.changeBalanceNum(goodId, way)
            }
        }
    };

    _removeThisGood(event, goodId) {
        store.shopCart.removeFromCart(goodId)
        store.balance.popThisFromBalance(goodId, true)
    };
    render() {
        const { cartItem } = this.props
        return (
            <div className="cart-item bg-fff">
                <Row className="flex-box">
                    <Col span={4} className="flex-box" onClick={this._toggleCheck.bind(this, cartItem.id)}>
                        {
                            this.state.ifChecked
                                ? <img className="icon" src={require('static/img/circle-1.png')} alt="" />
                                : <img className="icon" src={require('static/img/circle-0.png')} alt="" />
                        }
                    </Col>
                    <Col span={16}>
                        <div>
                            <Row className="flex-box">
                                <Col span={5} className="flex-box"><img className="good-img" src={cartItem.imgList[0]} alt="" /></Col>
                                <Col span={19} className="flex-box flex-ver-box flex-al-st">
                                    <p>{cartItem.name}</p>
                                    <p>售价:{cartItem.price}元 合计：{cartItem.price * cartItem.number}元</p>
                                    <div className="flex-box ">
                                        <div className="desc t-tc" onClick={this._changeNum.bind(this, cartItem.number, cartItem.id, -1)} >-</div>
                                        <div className="num t-tc"  >{cartItem.number}</div>
                                        <div className="plus t-tc" onClick={this._changeNum.bind(this, cartItem.number, cartItem.id, 1)} >+</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={4} className="flex-box">
                        <img className="icon" src={require('static/img/ic-del.png')} alt="" onClick={() => this._removeThisGood(this, cartItem.id)} />
                    </Col>
                </Row>
            </div>
        )
    }
})
export default cartItem