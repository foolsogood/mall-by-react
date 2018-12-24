import React, { Component } from "react";
import { Icon } from "antd-mobile";
import PropTypes from "prop-types";
import { connect } from "dva";
import event from "utils/event";
import tool from "utils/tool";
@connect(({ app }) => ({ app }))
class SmallLoading extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingShow: false,
      loadingTxt: "加载中……"
    };
  }
  componentDidMount() {
    event.on("showLoading", ({ isLoadingShow, loadingTxt = "加载中……" }) => {
      const fn = () => {
        if (
          isLoadingShow === this.state.isLoadingShow &&
          loadingTxt === this.state.loadingTxt
        ) {
          return;
        }
        this.setState({
          isLoadingShow,
          loadingTxt
        });
      };
      tool.throttle(fn, 10)();
    });
  }
  render() {
    const { isLoadingShow, loadingTxt } = this.state;
    const style = {
      position: "fixed",
      left: "50%",
      top: "50%",
      margin: "-1rem 0 0 -1rem",
      zIndex: 999,
      width: "2rem",
      height: "2rem",
      background: "rgba(0,0,0,.5)",
      borderRadius: "5%"
    };
    const isShow = { opacity: isLoadingShow ? 1 : 0 };

    return (
      <div className="flex-box flex-ver-box" style={{ ...style, ...isShow }}>
        <Icon type="loading" style={{ fontSize: ".4rem", color: "#444" }} />
        <span className="color-fff" style={{ lineHeight: ".7rem" }}>
          {loadingTxt}
        </span>
      </div>
    );
  }
}
SmallLoading.propTypes = {
  dispatch: PropTypes.func,
  app: PropTypes.object
};
export default SmallLoading;
