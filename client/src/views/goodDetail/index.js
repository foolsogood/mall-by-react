import React, { PureComponent } from "react";
import { Toast, Tabs } from "antd-mobile";
// 公共组件
import WithHeader from "components/common-components/withHeader";

import Banner from "components/common-components/banner";
// 组件
import Comments from "components/good-components/comments";
import GoodFooter from "components/good-components/goodFooter";
import { observer } from "mobx-react";
@observer
@WithHeader({ titleText: "商品页" })
class GoodDetail extends PureComponent {
  constructor() {
    super();
    this.state = {
      imgList: [""],
      detailList: [""],
      goodInfo: {},
      isCollect: false
    };
  }
  componentDidMount() {
    //    获取上一个路由传参
    let { goodId } = this.props.match.params;
    this.getGoodInfo(goodId);
  }
  async getGoodInfo(goodId) {
    const params = {goodId};
    const url = window.$api.good.getGoodById;
    try {
      const res = await window.$apiServer.get(url, { params });
      this.setState({
        goodInfo: res.data,
        // 在jsx中直接传goodInfo.imgList在子组件中取不到
        imgList: res.data.imgs,
        detailList: res.data.detailImg,
        isCollect: res.data.isCollect
      });
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  }
  //是否收藏商品
  toggleLike = async () => {
    const url = window.$api.good.collectGood;
    const { goodId } = this.props.match.params;
    const params = {goodId};
    const query = {
      isCollect: !this.state.isCollect
    };
    try {
      await window.$apiServer.post(url, { params, query });
      await this.setState({ isCollect: !this.state.isCollect });
      Toast.success(this.state.isCollect ? "收藏成功!" : "取消收藏!");
    } catch (err) {
      window.$commonErrorHandler(url)(err);
    }
  };
  render() {
    const tabs = [{ title: "商品详情" }, { title: "商品评论" }];
    const { goodInfo, imgList, detailList, isCollect } = this.state;
    return (
      <div>
        <div className="good-detail">
          <Banner imgList={imgList} />

          <div className="bg-fff detail-text">
            <p className="p-1">{goodInfo.goodName}</p>
            <p>{goodInfo.desction}</p>
            <p className="flex-box flex-ju-c-bt ">
              <span className="p-2 price">¥{goodInfo.price}</span>
              <span onClick={this.toggleLike}>
                {isCollect ? (
                  <span
                    className="iconfont icon-aixin"
                    style={{ color: "#ff0000" }}
                  />
                ) : (
                  <span className="iconfont icon-aixin1" />
                )}
              </span>
            </p>
          </div>
          <div className="hr" />
          <div className="bg-fff">
            <Tabs tabs={tabs} initialPage={0}>
              <div>
                {detailList.map((item, idx) => {
                  return (
                    <img
                      key={idx}
                      style={{ width: "100%", height: "auto" }}
                      src={item}
                      alt=""
                    />
                  );
                })}
              </div>
              <div>
                <Comments
                  goodInfo={goodInfo}
                  rateList={goodInfo.comments && goodInfo.comments.rows}
                />
              </div>
            </Tabs>
          </div>
          <GoodFooter goodInfo={goodInfo} />
        </div>
      </div>
    );
  }
}
export default GoodDetail;
