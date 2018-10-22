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
    _toggleCheck=(goodId)=> {
        if (this.state.ifChecked) {
            this.setState({
                ifChecked: false
            })
            store.shopCart.popThisFromBalance(goodId, true)
        } else {
            this.setState({
                ifChecked: true
            })
            store.shopCart.popThisFromBalance(goodId, false)
        }
    };

    _changeNum=(num, goodId, way)=> {

        if (way > 0) {
            store.shopCart.changeNum(goodId, way)
        } else if (way < 0) {
            if (num === 0) {
                return
            } else {
                store.shopCart.changeNum(goodId, way)
            }
        }
    };

    _removeThisGood=( goodId)=> {
        store.shopCart.removeFromCart(goodId)
    };
    componentDidMount() {
        this.setState({
            ifChecked: this.props.cartItem.isSelect
        })
    }
    render() {
        const { cartItem } = this.props
        const active = { color: '#1afa29' }
        const iconStyle = { fontSize: '.5rem' }
        const common = { color: '#8a8a8a' }
        const flexBox = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
        return (
            <div className="cart-item bg-fff">
                <Row style={flexBox}>
                    <Col span={4} onClick={() => { this._toggleCheck(cartItem.goodId) }}>
                        <div className="flex-box">
                            {
                                this.state.ifChecked
                                    ? <span className="iconfont icon-selected" style={{ ...iconStyle, ...active }}></span>
                                    : <span className="iconfont icon-yuancircle46" style={{ ...iconStyle, ...common }}></span>
                            }
                        </div>
                    </Col>
                    <Col span={16}>
                        <div>
                            <Row className="flex-box">
                                <Col span={5} className="flex-box"><img className="good-img" src={JSON.parse(cartItem.imgs)[0]} alt="" /></Col>
                                <Col span={19} className="flex-box flex-ver-box flex-al-st">
                                    <p>{cartItem.name}</p>
                                    <p>售价:{cartItem.price}元 合计：{cartItem.price * cartItem.number}元</p>
                                    <div className="flex-box ">
                                        <div className="desc t-tc" onClick={()=>this._changeNum( cartItem.number, cartItem.goodId, -1)} >-</div>
                                        <div className="num t-tc"  >{cartItem.number}</div>
                                        <div className="plus t-tc" onClick={()=>this._changeNum(cartItem.number, cartItem.goodId, 1)}>+</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={4} >
                        <div className="flex-box">
                            <span className="iconfont icon-shanchu" style={{ ...iconStyle, ...common }} onClick={() => this._removeThisGood( cartItem.goodId)} ></span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
})
export default cartItem