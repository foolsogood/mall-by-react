import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { Modal } from "antd-mobile";
import { Link } from "dva/router";
import PropTypes from "prop-types";
import { connect } from "dva";

import event from "utils/event";
const alert = Modal.alert;
@connect(({shopCart})=>({shopCart}))
class Balance extends PureComponent {
  constructor() {
    super();
    this.state = {
      sendTime: "尽快"
    };
  }
  componentDidMount() {
    event.on("sure-send-time", time => {
      console.log(time);
      this.setState({ sendTime: time });
    });
  }

  toPay = () => {
    alert("付款", "马上付款", [
      { text: "取消", onPress: () => console.log(1) },
      { text: "确定", onPress: () => this.addOrder() }
    ]);
  };
  async addOrder() {
    const {shopCart,dispatch}=this.props
    let goodList = Object.values(shopCart.cart)
      .filter(item => item.isSelect)
      .map(item => {
        const { goodId, price, number } = item;
        return {
          goodId,
          price,
          number
        };
      });
    const query = {
      goodList
    };
    const url = window.$api.order.addOrder;
    const option = { loadingText: "提交中……" };
    try {
      await window.$apiServer.post(url, { query, option });
      goodList.forEach(item => {
        dispatch({ type: "shopCart/removeFromCart", payload: item.goodId });
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  render() {
    const iconStyle = { fontSize: ".35rem" };
    const common = { color: "#8a8a8a" };
    const { shopCart } = this.props;
    const _cart = shopCart.cart;

    const balance =
      _cart && Object.values(_cart).length
        ? Object.values(_cart).filter(item => item.isSelect)
        : [];
    return (
      <div className="balance" style={{ position: "relative" }}>
        <div className="hr-40" />
        <div className="flex-box flex-ju-c-bt h-100 bg-fff pd-h-20 ">
          <span>请选择地址</span>
          <span
            className="iconfont icon-you"
            style={{ ...common, ...iconStyle }}
          />
        </div>

        <Row className=" h-100 bg-fff pd-h-20 bd-top">
          <Col span={4}>
            <img
              className=" icon-2 "
              src={require("assets/img/ic-wx-pay.png")}
              alt=""
            />
          </Col>
          <Col span={20}>
            <span>微信支付</span>
          </Col>
        </Row>
        <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
          <span>发票类型</span>
          <div className="flex-box">
            <span>不需要发票</span>
            <span
              className="iconfont icon-you"
              style={{ ...common, ...iconStyle }}
            />
          </div>
        </div>
        <Link to={`/sendTime`}>
          <div className="flex-box flex-ju-c-bt h-100 bg-fff  pd-h-20 bd-top">
            <span>送货时间</span>
            <div className="flex-box">
              <span>{this.state.sendTime}</span>
              <span
                className="iconfont icon-you"
                style={{ ...common, ...iconStyle }}
              />
            </div>
          </div>
        </Link>
        <div className="hr" />
        <div className="bg-fff  ">
          {balance.map((item, idx) => {
            return (
              <div key={idx} className="pd-20">
                <Row>
                  <Col span={5}>
                    <img src={JSON.parse(item.imgs)[0]} alt="" />
                  </Col>
                  <Col span={19} className="pd-lf-20">
                    <p>{item.goodName}</p>
                    <div className="flex-box flex-ju-c-bt">
                      <span>
                        售价：¥{item.price}元x{item.number}
                      </span>
                      <span>{item.price * item.number}元</span>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        <div className="balance-footer bg-fff">
          <Row>
            <Col span={14}>
              <div className="flex-box price">
                共{shopCart.cartTotalNum}件,合计：
                {shopCart.cartTotalPrice}元
              </div>
            </Col>
            <Col onClick={this.toPay} span={10}>
              <div className="flex-box pay">去付款</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
Balance.propTypes = {
  dispatch: PropTypes.func,
  shopCart: PropTypes.object
};
export default Balance
