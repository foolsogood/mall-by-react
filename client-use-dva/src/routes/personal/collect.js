import React, { Component } from "react";
import { SwipeAction, Toast } from "antd-mobile";
import { Link } from "dva/router";

//组件

class Collect extends Component {
  constructor() {
    super();
    this.state = {
      collectList: []
    };
  }
  componentDidMount() {
    this.getCollectGood();
  }
  //获取用户收藏商品列表
  getCollectGood = async () => {
    const url = window.$api.good.getCollectGood;
    try {
      const res = await window.$apiServer.get(url);
      this.setState({
        collectList: res.data
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  //取消收藏商品
  removeCollect = async (goodId, idx) => {
    const url = window.$api.good.collectGood;
    const query = {
      isCollect: false
    };
    const params = [goodId];
    let _temp = this.state.collectList;
    try {
      await window.$apiServer.post(url, { params, query });
      await _temp.splice(idx, 1);
      await this.setState({ collectList: _temp });
      Toast.success("取消收藏!");
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  render() {
    const { collectList } = this.state;
    return (
      <div>
        {collectList.map((item, idx) => {
          return (
            <div className="collect-item" key={`${item.goodName}`}>
              <SwipeAction
                style={{ backgroundColor: "gray" }}
                autoClose
                right={[
                  {
                    text: "取消",
                    onPress: () => console.log("cancel"),
                    style: { backgroundColor: "#ddd", color: "white" }
                  },
                  {
                    text: "删除",
                    onPress: () => this.removeCollect(item.goodId, idx),
                    style: { backgroundColor: "#F4333C", color: "white" }
                  }
                ]}
              >
                <Link to={`goodDetail/${item.goodId}`}>
                  <div className=" bg-fff pd-20 flex-box just-c-st flex-al-st">
                    <img
                      style={{ width: "1.2rem", height: "1.2rem" }}
                      alt={item.goodName}
                      src={item.imgs[0]}
                    />
                    <div className="pd-lf-20">
                      <p>{item.goodName}</p>
                      <p className="over-clamp2">{item.desction}</p>
                    </div>
                  </div>
                </Link>
              </SwipeAction>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Collect;
