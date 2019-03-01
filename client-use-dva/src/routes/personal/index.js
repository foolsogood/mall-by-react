import React, { PureComponent } from "react";
import { Row, Col } from "antd";
import { Link } from "dva/router";

//组件
import WithFooter from "components/common-components/withFooter";
import PropTypes from "prop-types";
import { connect } from "dva";
@connect(({ app }) => ({ app }))
@WithFooter
class Personal extends PureComponent {
  render() {
    const iconStyle = { fontSize: ".35rem" };
    const common = { color: "#8a8a8a" };
    const { user } = this.props.app;
    return (
      <div className="personal">
        <div className="personal-header">
          <img
            className="bg"
            src={require("assets/img/people_bg.png")}
            alt=""
          />
          <div className="info ">
            <Row type="flex" align="middle">
              <Col span={6}>
                <Link to={`/avatar`}>
                  <div className="flex-box">
                    <img
                      className="avatar "
                      src={
                        user.avatar
                          ? user.avatar
                          : require("assets/img/default-avatar.jpeg")
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </Col>
              <Col span={18}>
                <span>{user.username}</span>
              </Col>
            </Row>
          </div>
        </div>
        <div className="hr" />
        <div>
          <Link to={`/orders`}>
            <div className="flex-box flex-ju-c-bt h-80 bg-fff pd-h-20">
              <span>我的订单</span>
              <div className="flex-box">
                <span>全部订单</span>
                <span
                  className="iconfont icon-you"
                  style={{ ...common, ...iconStyle }}
                />
              </div>
            </div>
          </Link>
          <div className="flex-box bg-fff pd-v-20 bd-top">
            <div className="flex-box flex-ver-box flex-1">
              <img
                className="icon"
                src={require("assets/img/ic-paying.png")}
                alt=""
              />
              <span>待付款</span>
            </div>
            <div className="flex-box flex-ver-box flex-1">
              <img
                className="icon"
                src={require("assets/img/ic-delivering.png")}
                alt=""
              />
              <span>待发货</span>
            </div>
            <div className="flex-box flex-ver-box flex-1">
              <img
                className="icon"
                src={require("assets/img/ic-evaluate.png")}
                alt=""
              />
              <span>待收货</span>
            </div>
            <div className="flex-box flex-ver-box flex-1">
              <img
                className="icon"
                src={require("assets/img/ic-refund.png")}
                alt=""
              />
              <span>待评价</span>
            </div>
            <div className="flex-box flex-ver-box flex-1">
              <img
                className="icon"
                src={require("assets/img/ic-receipting.png")}
                alt=""
              />
              <span>退款</span>
            </div>
          </div>
        </div>
        <div className="hr" />
        <Link to={`/bindPhone`}>
          <div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff">
            <div className="flex-box">
              <img
                className="icon-1"
                src={require("assets/img/phone.png")}
                alt=""
              />
              <span>绑定手机</span>
            </div>
            <span
              className="iconfont icon-you"
              style={{ ...common, ...iconStyle }}
            />
          </div>
        </Link>
        <Link to={`/collect`}>
          <div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff bd-top">
            <div className="flex-box">
              <img
                className="icon-1"
                src={require("assets/img/collect.png")}
                alt=""
              />
              <span>我的收藏</span>
            </div>
            <span
              className="iconfont icon-you"
              style={{ ...common, ...iconStyle }}
            />
          </div>
        </Link>
        <div className="hr" />
        <div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff">
          <div className="flex-box">
            <img
              className="icon-1"
              src={require("assets/img/help.png")}
              alt=""
            />
            <span>购物帮助</span>
          </div>
          <span
            className="iconfont icon-you"
            style={{ ...common, ...iconStyle }}
          />
        </div>
        <Link to={`/feedback`}>
          <div className="flex-box flex-ju-c-bt h-80 pd-h-20 bg-fff bd-top">
            <div className="flex-box">
              <img
                className="icon-1"
                src={require("assets/img/feedback.png")}
                alt=""
              />
              <span>意见反馈</span>
            </div>
            <span
              className="iconfont icon-you"
              style={{ ...common, ...iconStyle }}
            />
          </div>
        </Link>
      </div>
    );
  }
}
Personal.propTypes = {
  // dispatch:PropTypes.func,
  user: PropTypes.object
};
export default Personal;
