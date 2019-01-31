import React, { Component } from 'react'
import CartEmpty from './cartEmpty'
import CartList from './cartList'
//公共组件
import WithHeader from 'components/common-components/withHeader'
import PropTypes from "prop-types";
import { connect } from "dva";
@connect(({ shopCart }) => ({ shopCart }))
@WithHeader({ ifBackShow: false, titleText: '购物车' })
class shopCart extends Component {
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
shopCart.propTypes = {
    dispatch: PropTypes.func,
    shopCart: PropTypes.object
  };
export default (shopCart);
