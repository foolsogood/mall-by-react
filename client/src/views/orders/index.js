import React, { Component } from "react";
import { Row, Col } from "antd";
import { Modal, Tabs } from "antd-mobile";
import { Link } from "react-router-dom";
import WithHeader from "components/common-components/withHeader";

import OrderItem from "components/order-components/order-item";

import event from "utils/event";
const alert = Modal.alert;
@WithHeader({ titleText: "我的订单" })
class Orders extends Component {
  constructor() {
    super();
    this.state = {
      orderList: []
    };
  }
  componentDidMount() {
    this.getOrders();
  }
  getOrders() {
    const url = $api.order.getOrders;
    $apiServer
      .get(url)
      .then(res => {
        this.setState({
          orderList: res.data
        });
      })
      .catch($commonErrorHandler.apply(this, [url]));
  }
  render() {
    const { orderList } = this.state;
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
        <Tabs tabs={tabs} initialPage={0}>
          <div>
            {orderList.map((order,index) => {
              return (
                <div key={index} style={{borderRadius:'.5rem',padding:' .15rem',boxSizing:'content-box'}}>
                  {order.map((item, idx) => {
                    return <OrderItem key={idx} order={item} />;
                  })}
                </div>
              );
            })}
          </div>

          <div style={divStyle}>Content of second tab</div>
          <div style={divStyle}>Content of third tab</div>
        </Tabs>
      </div>
    );
  }
}
export default Orders;
