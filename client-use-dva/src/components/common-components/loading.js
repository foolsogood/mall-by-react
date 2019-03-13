import React, { Component } from "react";
import { Spin } from "antd";

export default class Loading extends Component {
  render() {
    const divStyle = {
      position: "fixed",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      // background: 'rgba(255,255,255,.5)',
      opacity: 0
    };
    return (
      <div className="flex-box flex-ver-box" style={divStyle}>
        <Spin tip="loading……" />
      </div>
    );
  }
}
