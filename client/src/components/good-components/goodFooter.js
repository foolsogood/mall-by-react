import React, { Component } from 'react'
import { Row, Col } from 'antd'
//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
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
    addToCart=()=> {
        const { goodInfo } = this.props
        store.shopCart.addToCart(goodInfo.goodId, goodInfo)
        this.context.router.history.push({
            pathname: '/shopCart'
        })
    };
    balanceThisGood=()=> {
        const { goodInfo } = this.props
        store.shopCart.addToCart(goodInfo.goodId, goodInfo)
        this.context.router.history.push({
            pathname: '/balance'
        })
    };
    componentDidMount() {
        // console.log( this.context)
    };
    render() {
        const iconStyle = { fontSize: '.4rem' }
        const common = { color: '#8a8a8a' }
        return (
            <div className="good-footer ">
                <Row>
                    <Col span={5} >
                        <Link to={`/`} className="flex-box flex-ver-box btn-1">
                            <span className="iconfont icon-weibiaoti1" style={{ ...iconStyle, ...common }}></span>

                            <span >主页</span>
                        </Link>
                    </Col>
                    <Col span={5} >
                        <Link to={`/classify`} className="flex-box flex-ver-box btn-1">
                            <span className="iconfont icon-fenleitianchong" style={{ ...iconStyle, ...common }}></span>

                            <span>分类</span>
                        </Link>
                    </Col>
                    <Col span={7} className=" btn-2" onClick={this.addToCart}>
                        <div className="flex-box">
                            加入购物车
                        </div>
                    </Col>
                    <Col span={7} className=" btn-3" onClick={this.balanceThisGood}>
                        <div className="flex-box">
                            <span className="color-fff">立即购买</span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
})
export default GoodFooter
