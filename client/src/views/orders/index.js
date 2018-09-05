import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Modal, Tabs } from 'antd-mobile'
import { Link } from 'react-router-dom'
import TitleBar from 'components/common-components/titleBar.js'
import OrderItem from 'components/order-components/order-item'


import event from 'utils/event'

//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
// const TabPane = Tabs.TabPane
const alert = Modal.alert;
const _order = observer(class Orders extends Component {
    constructor() {
        super()
        this.state = {
            orderList: []
        }
    };
    componentDidMount() {
        this._getOrders()
    }
    _getOrders() {
        const userid = store.user.user ? store.user.user.userid : undefined
        const query = { userid }
        const url = $api.order.getOrders
        $apiServer.get(url, { query })
            .then($preAjaxHandler.call(this))
            .then(res => {
                if (res.code === '1') {
                    this.setState({
                        orderList: res.data
                    })
                } else if (res.code === '1000') {
                    alert('提示', '请重新登录', [
                        { text: '暂不', onPress: () => console.log('cancel') },
                        { text: '好的', onPress: () => event.emit('showLogin', true) },
                    ])

                }
            }).catch($commonErrorHandler.apply(this, [url]))

    };
    render() {
        const { orderList } = this.state
        const tabs = [
            { title: '未发货' },
            { title: '已发货' },
            { title: '已评价' },
        ];
        return (
            <div>
                <TitleBar titleText="我的订单" />
                <Tabs tabs={tabs}
                    initialPage={1}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
                    <div>
                        {
                            orderList.map((item, idx) => {
                                return (
                                    <OrderItem key={idx} order={item} />
                                )
                            })
                        }
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
      </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of third tab
      </div>

                </Tabs>
            </div>
        )
    }
})
export default _order
