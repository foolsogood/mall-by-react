import React, { PureComponent } from "react";
import { Tabs } from "antd";
import {Toast} from 'antd-mobile'
// 公共组件
import WithHeader from "components/common-components/withHeader";

import Banner from "components/common-components/banner";
// 组件
import Comments from "components/good-components/comments";
import GoodFooter from "components/good-components/goodFooter";
const TabPane = Tabs.TabPane;
@WithHeader({ titleText: "商品页" })
class GoodDetail extends PureComponent {
  constructor() {
    super();
    this.state = {
      imgList: [""],
      detailList: [""],
      goodInfo: {},
      isLike: false
    };
  }
  componentDidMount() {
    //    获取上一个路由传参
    let { goodId } = this.props.match.params;
    this.getGoodInfo(goodId);
  }
  getGoodInfo(goodId) {
    const params = [goodId];
    const url = $api.good.getGoodById;
    $apiServer
      .get(url, { params })
      .then($preAjaxHandler.call(this))
      .then(res => {
        this.setState({
          goodInfo: res.data,
          // 在jsx中直接传goodInfo.imgList在子组件中取不到
          imgList: JSON.parse(res.data.imgs),
          detailList: JSON.parse(res.data.detailImg)
        });
      })
      .catch($commonErrorHandler.apply(this, [url]));
  }
  //是否收藏商品
  toggleLike=async()=> {
      //TODO 数据提交
     await this.setState({isLike:!this.state.isLike})
      Toast.success(this.state.isLike?'收藏成功!':'取消收藏!')
  }
  render() {
    const { goodInfo, imgList, detailList, isLike } = this.state;
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
                {isLike ? (
                  <span className="iconfont icon-aixin" style={{color:'#ff0000'}}/>
                ) : (
                  <span className="iconfont icon-aixin1" />
                )}
              </span>
            </p>
          </div>
          <div className="hr" />
          <div className="bg-fff">
            <Tabs defaultActiveKey="1">
              <TabPane tab="商品详情" key="1">
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
              </TabPane>
              <TabPane tab="商品评论" key="2">
                <Comments rateList={goodInfo.comments} />
              </TabPane>
            </Tabs>
          </div>
          <GoodFooter goodInfo={goodInfo} />
        </div>
      </div>
    );
  }
}
export default GoodDetail;
