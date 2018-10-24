import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import WithHeader from 'components/common-components/withHeader'

//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
import event from 'utils/event'


@observer
@WithHeader({ titleText: '结算' })

class Balance extends Component {
    constructor() {
        super()
        this.state = {
            sendTime: '尽快',
        }
    };
    componentDidMount() {
        event.on('sure-send-time', time => {
            console.log(time)
            this.setState({ sendTime: time })
        })
    }

    toPay = () => {
        if (!store.user.user) {
            $event.emit('showLogin', true)
        } else {
            // alert('您已支付')
            this.addOrder()
        }
    }
    addOrder() {
        let cateId = [],
            goodId = [],
            price = [],
            number = [];
        Object.values(store.shopCart.cart).forEach(item => {
            if (item.isSelect) {
                goodId.push(item.goodId)
                price.push(item.price)
                number.push(item.number)
            }
        })
        const query = {
            userid: store.user.user.userid,
            goodId: JSON.stringify(goodId),
            price: JSON.stringify(price),
            number: JSON.stringify(number)
        }
        const url = $api.order.addOrder
        $apiServer.post(url, { query })
            .then($preAjaxHandler.call(this))
            .then(res => {
                goodId.forEach(item => {
                    store.shopCart.removeFromCart(item)
                })
            }).catch($commonErrorHandler.apply(this, [url]))

    }
    render() {
        const iconStyle = { fontSize: '.35rem' }
        const common = { color: '#8a8a8a' }
        const balance = store.shopCart.cart && Object.values(store.shopCart.cart).length ? Object.values(store.shopCart.cart).filter(item => item.isSelect) : []
        return (
            <div className="balance" style={{ position: 'relative' }}>

                <div className="hr-40"></div>
                <div className="flex-box flex-ju-c-bt h-100 bg-fff pd-h-20 ">
                    <span>请选择地址</span>
                    <span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>
                </div>

                <Row className=" h-100 bg-fff pd-h-20 bd-top">
                    <Col span={4} >
                        <img className=" icon-2 " src={require('assets/img/ic-wx-pay.png')} alt="" />
                    </Col>
                    <Col span={20} ><span>微信支付</span></Col>
                </Row>
                <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
                    <span>发票类型</span>
                    <div className="flex-box">
                        <span >不需要发票</span>
                        <span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

                    </div>
                </div>
                <Link to={`/sendTime`}>
                    <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
                        <span>送货时间</span>
                        <div className="flex-box">
                            <span>{this.state.sendTime}</span>
                            <span className="iconfont icon-you" style={{ ...common, ...iconStyle }}></span>

                        </div>
                    </div>
                </Link>
                <div className="hr"></div>
                <div className="bg-fff  ">
                    {
                        balance.map((item, idx) => {
                            return (
                                <div key={idx} className="pd-20">
                                    <Row>
                                        <Col span={5}>
                                            <img src={JSON.parse(item.imgs)[0]} alt="" />
                                        </Col>
                                        <Col span={19} className="pd-lf-20">
                                            <p>{item.goodName}</p>
                                            <div className="flex-box flex-ju-c-bt">
                                                <span>售价：¥{item.price}元x{item.number}</span>
                                                <span>{item.price * item.number}元</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="balance-footer bg-fff">
                    <Row >
                        <Col span={14} >
                            <div className="flex-box price">
                                共{store.shopCart.cartTotalNum}件,合计：{store.shopCart.cartTotalPrice}元
                        </div>
                        </Col>
                        <Col onClick={this.toPay} span={10} >
                            <div className="flex-box pay">
                                去付款
                    </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default Balance