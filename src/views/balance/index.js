import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import TitleBar from 'components/common-components/titleBar.js'
//图标
import iconNext from 'static/img/ic-next2.png'
import iconWechat from 'static/img/ic-wx-pay.png'
//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'

const Balance = observer(class Balance extends Component {
    constructor() {
        super()
        this.state = {
            sendTime: '尽快'
        }

    };

    componentDidMount() {
        // this._onSendTime()

    };
    _onSendTime() {
    //    console.log(emitter)
    //     emitter.on('sendTime', () => {
    //         console.log('on')
    //         // this.setState({ sendTime: res })
    //     })
    };
    _test(){
        // emitter.emit('sendTime')
    };
    render() {
        return (
            <div className="balance">
                <TitleBar  titleText="结算" />
                <div className="hr-40"></div>
                <div className="flex-box flex-ju-c-bt h-100 bg-fff pd-h-20 ">
                    <span>请选择地址</span>
                    <img className="icon-1" src={iconNext} alt="" />
                </div>

                <Row className=" h-100 bg-fff pd-h-20 bd-top">
                    <Col span={4} >
                        <img className=" icon-2 " src={iconWechat} alt="" />
                    </Col>
                    <Col span={20} ><span>微信支付</span></Col>
                </Row>
                <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
                    <span>发票类型</span>
                    <div className="flex-box">
                        <span onClick={this._test.bind(this)}>不需要发票</span>
                        <img className="icon-1" src={iconNext} alt="" />
                    </div>
                </div>
                <Link to={`/sendTime`}>
                    <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
                        <span>送货时间</span>
                        <div className="flex-box">
                            <span>{this.state.sendTime}</span>
                            <img className="icon-1" src={iconNext} alt="" />
                        </div>
                    </div>
                </Link>
                <div className="hr"></div>
                <div className="bg-fff  ">
                    {
                        Object.keys(store.balance.balance).map((item, idx) => {
                            return (
                                <div key={idx} className="pd-20">
                                    <Row>
                                        <Col span={5}>
                                            <img src={store.balance.balance[item].imgList[0]} alt="" />
                                        </Col>
                                        <Col span={19} className="pd-lf-20">
                                            <p>{store.balance.balance[item].name}</p>
                                            <div className="flex-box flex-ju-c-bt">
                                                <span>售价：¥{store.balance.balance[item].price}元x{store.balance.balance[item].number}</span>
                                                <span>{store.balance.balance[item].price * store.balance.balance[item].number}元</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>
                <Row className="balance-footer bg-fff">
                    <Col span={14} className="flex-box price">
                        共{store.balance.balanceNum}件,合计：{store.balance.balancePrice}元
                    </Col>
                    <Col span={10} className="flex-box pay">去付款</Col>
                </Row>
            </div>
        )
    }
})
export default Balance