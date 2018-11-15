import React, { Component } from 'react'

import CartEmpty from './cartEmpty'
import CartList from './cartList'
//公共组件
import WithHeader from 'components/common-components/withHeader'

//引入mobx相关
import { observer } from 'mobx-react'
import store from 'store'
@observer
@WithHeader({ ifBackShow: false, titleText: '购物车' })

class shopCart extends Component {
    render() {
        const _cart = store.shopCart.cart
        const flag=_cart && Object.values(_cart).length
        // console.log(Boolean(flag),flag)
        return (
            <div>
                {
                    flag
                        ? <CartList />
                        : <CartEmpty />
                }
            </div>
        )
    }
}
export default shopCart