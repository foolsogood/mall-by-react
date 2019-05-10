import React, { Component } from 'react'
import CartEmpty from './cartEmpty'
import CartList from './cartList'
//公共组件
import { connect } from "dva";
interface Props{
    shopCart:any,
    dispatch?:(args)=>void,
  }
@connect(({ shopCart }) => ({ shopCart }))
class shopCart extends Component<Props> {
    render() {
        const {cart} = this.props.shopCart
        return (
            <div>
                {
                    cart && Object.values(cart).length
                        ? <CartList />
                        : <CartEmpty />
                }
            </div>
        )
    }
}

export default (shopCart);
