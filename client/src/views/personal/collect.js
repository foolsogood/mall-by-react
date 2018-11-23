import React, { Component } from "react";
import { SwipeAction, Toast } from "antd-mobile";
import { Link } from "react-router-dom";

//组件
import WithHeader from "components/common-components/withHeader";

@WithHeader({ titleText: "商品收藏" })
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
  getCollectGood = async () => {
    const url = $api.good.getCollectGood;
    $apiServer
      .get(url)
      .then(res => {
        this.setState({
          collectList: res.data
        });
      })
      .catch($commonErrorHandler.apply(this, [url]));
  };
  //取消收藏商品
  removeCollect = (goodId, idx) => {
    const url = $api.good.collectGood;
    const query = {
      isCollect: false
    };
    const params = [goodId];
    let _temp = this.state.collectList;
    $apiServer
      .post(url, { params, query })
      .then(async res => {
        await _temp.splice(idx, 1);
        await this.setState({ collectList: _temp });
        Toast.success("取消收藏!");
      })
      .catch($commonErrorHandler.apply(this, [url]));
  };
  render() {
    const { collectList } = this.state;
    return (
      <div>
        {collectList.map((item, idx) => {
          return (
            <div
              className="collect-item"
              key={`${item.goodName}`}
            >
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
                      src={JSON.parse(item.imgs)[0]}
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
