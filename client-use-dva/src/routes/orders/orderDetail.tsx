import React, { Component } from 'react';
// import { Link } from "dva/router";
interface Props {
  match?: any;
}
//
class OrderDetail extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = {};
  }
  componentDidMount() {
    this.getOrderDetail();
  }
  async getOrderDetail() {
    const url = window.$api.order.getOrderDetail;
    const { orderId } = this.props.match.params;
    const params = {orderId};
    try {
      const res = await window.$http.get(url, { params });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  render() {
    return <div />;
  }
}
export default OrderDetail;
