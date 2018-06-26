import React, { Component } from 'react'
import { Row, Col } from 'antd'
import home0 from 'static/img/home-0.png'
import classify0 from 'static/img/classify-0.png'
//引入mobx相关
import { observer } from 'mobx-react'
import store from '../../store'
//路由相关
import { Link } from 'react-router-dom'
// 
import PropTypes from 'prop-types'
const GoodFooter = observer(class GoodFooter extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    // constructor(props, context) {
    //     super(props, context)
    // };
    _addToCart() {
        const { goodInfo } = this.props
        store.shopCart.addToCart(goodInfo.id, goodInfo)
        store.balance.addToBalance(goodInfo.id, goodInfo)
        this.context.router.history.push({
            pathname: '/shopCart'
        })
    };
    _balanceThisGood() {
        const { goodInfo } = this.props
        store.shopCart.addToCart(goodInfo.id, goodInfo)
        store.balance.addToBalance(goodInfo.id, goodInfo)
        this.context.router.history.push({
            pathname: '/balance'
        })
    };
    componentWillMount() {
        // console.log( this.context)
    };
    render() {

        return (
            <div className="good-footer ">
                <Row>
                    <Col span={5} >
                        <Link to={`/`} className="flex-box flex-ver-box btn-1">
                            <img className="icon" src={home0} alt="" />
                            <span >主页</span>
                        </Link>
                    </Col>
                    <Col span={5} >
                        <Link to={`/classify`} className="flex-box flex-ver-box btn-1">
                            <img className="icon" src={classify0} alt="" />
                            <span>分类</span>
                        </Link>
                    </Col>
                    <Col span={7} className="flex-box btn-2" onClick={this._addToCart.bind(this)}>
                        加入购物车
                    </Col>
                    <Col span={7} className="flex-box btn-3" onClick={this._balanceThisGood.bind(this)}>
                        <span className="color-fff">立即购买</span>
                    </Col>
                </Row>
            </div>
        )
    }
})
export default GoodFooter
