import React, { Component } from 'react'
import { Row, Col, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import TitleBar from 'components/common-components/titleBar.js'
import OrderItem from 'components/order-components/order-item'
import xhr from 'service/xhr'
import api from 'service/api'
//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
const TabPane = Tabs.TabPane

const _order = observer(class Orders extends Component {
    constructor() {
        super()
        this.state = {

        }
    };
    componentDidMount() {
        this._getHomeImgList()
    }
    _getHomeImgList() {
        const query = { userid: store.user.user.userid}
        xhr.get(api.order.getOrders, { query }).then(res => {
            if (res.code === '1') {

            }
        }).catch(err => { })
    };
    render() {
        return (
            <div>
                <TitleBar titleText="我的订单" />
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="未发货" key="1">
                        <div>
                            {
                                [1, 2, 3, 4, 5].map((item, idx) => {
                                    return (
                                        <OrderItem key={idx} />
                                    )
                                })
                            }
                        </div>

                    </TabPane>
                    <TabPane tab="已收货" key="2">
                        <div>已收货</div>

                    </TabPane>
                    <TabPane tab="已评价" key="3">
                        <div>已评价</div>

                    </TabPane>
                </Tabs>
            </div>
        )
    }
})
export default _order
