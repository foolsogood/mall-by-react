import React, { Component } from 'react'

import CartEmpty from './cartEmpty'
import CartList from './cartList'
//公共组件
import TitleBar from '../../components/common-components/titleBar.js'
//引入mobx相关
import { observer } from 'mobx-react'
import store from '../../store'
const cart=observer( class shopCart extends Component {
    constructor() {
        super()
        this.state = {
          
            ifBackShow: false,
           
        }
    };
    render() {
        return (
            <div>
                <TitleBar  ifBackShow={this.state.ifBackShow} titleText="购物车" />
                {
                   store.shopCart.cart
                    ?<CartList/>
                    :<CartEmpty/>
                }
            </div>
        )
    }
})
export default  cart