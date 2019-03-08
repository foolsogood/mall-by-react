import React, { Component } from "react";
import RecomItem from "./recomItem";
import PropTypes from "prop-types";

export default class RecomList extends Component {
  constructor() {
    super();
    this.state = {
      obj: []
    };
  }
  static propTypes = {
    titleText: PropTypes.string
  };
  componentDidMount() {
    this.getRecomGoods();
  }
  async getRecomGoods() {
    const url = window.$api.good.getNewGoods;
    try {
      const res = await window.$http.get(url);
      this.setState({
        obj: res.data
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  render() {
    return (
      <div className="bg-fff home-good">
        <div className="home-good-title">{this.props.titleText}</div>
        <div>
          {this.state.obj.map(item => {
            return <RecomItem key={item.goodId} good={item} />;
          })}
        </div>
      </div>
    );
  }
}
