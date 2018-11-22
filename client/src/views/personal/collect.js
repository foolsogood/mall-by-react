import React, { PureComponent } from "react";
// import { Row, Col } from 'antd'
import { Link } from "react-router-dom";

//组件
import WithHeader from "components/common-components/withHeader";

@WithHeader({ titleText: "商品收藏" })
class Collect extends PureComponent {
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
  render() {
    const { collectList } = this.state;
    return (
      <div>
        {collectList.map(item => {
          return (
            <div
              className="collect-item"
              key={`${item.goodId}_${item.goodName}`}
            >
              <Link to={`goodDetail/${item.goodId}`}>
                <div className=" bg-fff pd-20 flex-box just-c-st flex-al-st">
                  <img
                    style={{ width: "1.2rem", height: "1.2rem" }}
                    src={JSON.parse(item.imgs)[0]}
                  />
                  <div className="pd-lf-20" >
                    <p >{item.goodName}</p>
                    <p className="over-clamp2">{item.desction}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Collect;
