import React, { Component } from "react";
import { Tabs } from "antd-mobile";

import OrderItem from "./components/order-item";
import ErrorBoundary from "components/common/errorBoundary";
// @ErrorBoundary
interface State {
  orderList: any[];
}
type ReadonlyState = Readonly<State>;

class Orders extends Component<{}, ReadonlyState> {
  constructor(props) {
    super(props);
    this.state = {
      orderList: null
    };
  }
  componentDidMount() {
    this.getOrders();
  }
  async getOrders() {
    const url = window.$api.order.getOrders;
    try {
      const res = await window.$http.get(url);
      // console.log('res', res);
      if (!res) return;
      this.setState({
        orderList: res.data.orderList
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  render() {
    const { orderList } = this.state;
    if (!orderList) {
      return null;
    }
    const tabs = [
      { title: "未发货" },
      { title: "已发货" },
      { title: "已评价" }
    ];
    const divStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "150px",
      backgroundColor: "#fff"
    };
    return (
      <div>
        <ErrorBoundary>
          <Tabs tabs={tabs} initialPage={0}>
            <div>
              {orderList.map((order, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: ".5rem",
                      padding: " .15rem",
                      boxSizing: "content-box"
                    }}>
                    {order.list.map((item, idx) => {
                      return <OrderItem key={idx} order={item} />;
                    })}
                  </div>
                );
              })}
            </div>

            <div style={divStyle}>Content of second tab</div>
            <div style={divStyle}>Content of third tab</div>
          </Tabs>
        </ErrorBoundary>
      </div>
    );
  }
}
export default Orders;
